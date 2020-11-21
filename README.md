# foora
 An api client for [forem](https://github.com/forem/forem) the platform that powers [dev.to](https://dev.to) for [deno](https://deno.land/). 
 
## Usage
 
```typescript
import { createClient } from 'https://deno.land/x/foora/mod.ts';

const client = createClient({
  baseUrl: 'https://dev.to/api',
  secret: 'my-dev-to-secret'
})
```


 ---
 
 Based on the swagger definition available at [dev-to-swagger](http://alfredosalzillo.me/dev-to-swagger/#/),
