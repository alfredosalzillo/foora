export type CRUDMethods = 'create' | 'update' | 'retrieve' | 'retrieveAll' | 'delete';

export type CRUDMethodConfig = {
  private?: boolean,
};
export type CRUDMethodsConfig = Partial<Record<CRUDMethods, CRUDMethodConfig>>;
export type CreateCRUDOptions = {
  baseUrl: string,
  secret?: string,
  methods: CRUDMethodsConfig,
};
type MethodOptions = {
  baseUrl: string,
  secret?: string,
  method?: CRUDMethodConfig,
};
type Create<Entity, Options> = (options: Options) => Promise<Entity>;
type Update<Entity, Options> = (id: number, options: Options) => Promise<Entity>;
type Read<Entity, ID = number> = (id: ID) => Promise<Entity>;
type ReadAll<Entity, Options> = (options?: Options) => Promise<Entity[]>;
type Delete = (id: number | string) => Promise<void>;
type Crud<Entity, EntitySummary, C, U, RA, Methods extends CRUDMethods> = Pick<{
    create: Create<Entity, C> ,
    update:  Update<Entity, U>,
    retrieve:  Read<Entity>,
    retrieveAll: ReadAll<EntitySummary, RA>,
    delete: Delete,
}, Methods>;

const throwIfNeeded = ( config: MethodOptions) => {
  const { secret, method } = config;
  if (!(method)) {
    throw new Error('Method not implemented')
  }
  const { private: isPrivate } = method!;
  if (isPrivate && !secret) {
    throw new Error('secret required to call this method');
  }
}
export const createCreate = <Entity, Options>(config: MethodOptions): Create<Entity, Options> => (options: Options) => {
  throwIfNeeded(config);
  const { baseUrl, secret } = config;
  return fetch(baseUrl, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      "Api-Key": secret!,
    }),
    body: JSON.stringify(options),
  }).then(response => response.json());
}
export const createUpdate = <Entity, Options>(config: MethodOptions): Update<Entity, Options> => (id: number, options: Options) => {
  throwIfNeeded(config);
  const { baseUrl, secret } = config;
  return fetch(`${baseUrl}/${id}`, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      "Api-Key": secret!,
    }),
    body: JSON.stringify(options),
  }).then(response => response.json());
};
export const createRetrieve = <Entity, ID = number>(config: MethodOptions): Read<Entity, ID> => (id: ID) => {
  throwIfNeeded(config);
  const { baseUrl, secret } = config;
  return fetch(`${baseUrl}/${id}`, {
    method: 'GET',
    headers: new Headers({
      "Api-Key": secret!,
    }),
  }).then(response => response.json());
};
const toQueryParams = (data?: any) => Object.entries(data || {}).map((entry) => entry.join("=")).join("&")
export const createRetrieveAll = <Entity, Options>(config: MethodOptions): ReadAll<Entity, Options> => (options?: Options) => {
  throwIfNeeded(config);
  const { baseUrl, secret } = config;
  return fetch(`${baseUrl}?${toQueryParams(options)}`, {
    method: 'GET',
    headers: new Headers({
      "Api-Key": secret!,
    }),
  }).then(response => response.json());
};
export const createDelete = (config: MethodOptions): Delete => (id) => {
  throwIfNeeded(config);
  const { baseUrl, secret } = config;
  return fetch(`${baseUrl}/${id}`, {
    method: 'POST',
    headers: new Headers({
      "Api-Key": secret!,
    }),
  }).then(() => {});
};

const PickProperties = <O, T extends keyof O>(object: O, keys: T[]): Pick<O, T> => Object
  .fromEntries(Object.entries(object).filter(([key]) => keys.includes(key as unknown as T))) as Pick<O, T>;
type CreateCRUD = <Entity, EntitySummary, C, U, RA, T extends CRUDMethods>(options: CreateCRUDOptions) => Crud<Entity, EntitySummary, C, U, RA, T>;
export const createCRUD: CreateCRUD = <Entity, EntitySummary, C, U, RA, T extends CRUDMethods>(options: CreateCRUDOptions): Crud<Entity, EntitySummary, C, U, RA, T> => PickProperties(({
  create: createCreate<Entity, C>({ ...options, method: options.methods.create }),
  update: createUpdate<Entity, U>({ ...options, method: options.methods.update }),
  retrieve: createRetrieve<Entity>({ ...options, method: options.methods.retrieve }),
  retrieveAll: createRetrieveAll<EntitySummary, RA>({ ...options, method: options.methods.retrieveAll }),
  delete: createDelete({ ...options, method: options.methods.delete })
}), Object.keys(options.methods) as CRUDMethods[])
