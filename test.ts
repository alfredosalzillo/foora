import {
  assert,
} from "https://deno.land/std@0.78.0/testing/asserts.ts";
import { createClient } from './mod.ts';

const originalFetch = globalThis.fetch;
globalThis.fetch = (...args) => {
  console.log('fetch called with', args);
  return originalFetch(...args).then((response) => {
    console.log('fetch response', response);
    return response;
  })
}

const client = createClient({
  baseUrl: 'https://dev.to/api',
})

Deno.test("should successfully retrieve articles", async () => {
  await client.articles.retrieveAll({});
});
