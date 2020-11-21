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
## Available apis

### articles

- **create** create an article

    ```typescript
    client.articles.create({
        title: 'My swag article',
        body_markdown: `
    #My swag article
    Hello world dev.to!
        `,
        published: true,
        tags: ['disc', 'hello'],
    })
    ```
- **update** update an article

    ```typescript
    client.articles.update(1234, {
        tags: ['disc', 'hello', 'world'],
    })
     ```
- **retrieve** retrieve an article by id

  ```typescript
  const article = await client.articles.retrieve(1234);
  console.log(`Hello my first article title have ${article.positive_reactions_count} reactions`);
  ```
- **retrieveAll** retrieve all articles

  ```typescript
  const articles = await client.articles.retrieveAll({ 
    page: 25,
    per_page: 30,
  });
  ```
- **byPath** retrieve article by path

  ```typescript
    const article = await client.articles.byPath('alfredosalzillo/my-swag-article');
    console.log(`Hello my first article title have ${article.positive_reactions_count} reactions`);
  ```
- **mine** retrieve articles of the user how generate the secret

    ```typescript
    const articles = await client.articles.mine({ 
      page: 25,
      per_page: 30,
    });
    ```
- **minePublished** retrieve published articles of the user how generate the secret 

    ```typescript
    const articles = await client.articles.minePublished({ 
      page: 25,
      per_page: 30,
    });
    ```
- **mineUnpublished** retrieve unpublished articles of the user how generate the secret
    
    ```typescript
    const articles = await client.articles.mineUnpublished({ 
      page: 25,
      per_page: 30,
    });
    ```
- **mineAll** retrieve all articles of the user how generate the secret

    ```typescript
    const articles = await client.articles.mineAll({ 
      page: 25,
      per_page: 30,
    });
    ```
 ---
 
 Based on the swagger definition available at [dev-to-swagger](http://alfredosalzillo.me/dev-to-swagger/#/),
