# FE Paired Programming Test

## Overview

Our applications requires basic login functionality on the frontend. We have an API that can authenticate. The requirement is to use the APIs provided and create a login page for the user. Once logged in, fetch data about the user and display a message.

## Requirements

1. Once a user has logged in, they should be presented with a page with their name. This data can be fetched using the /me endpoint.
2. If a user refreshes, or moves away from the page and comes back the user should still be authenticated.
3. API errors should be handled and presented gracefully to the user.
4. How would you test this application?
5. The application should have a simple appealing UI.

## Reference

[Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) or [Axios](https://axios-http.com/docs/intro)

npm install <react-router-dom>@<version> - [React Router v6](https://reactrouter.com/docs/en/v6/getting-started/overview) or [React Router v5](https://v5.reactrouter.com/web/guides/quick-start)

## API

You can run the API server locally on port 8080 using the following script:

```bash
npm install
npm run start:server
```

Run the front-end build with:
```bash
npm start
```

**Login endpoint**

```jsx

**Request

curl -X POST http://localhost:8080/login -d"
{
  username: String,
  password: String
}"

Response

200 - if successful
{
  token: String
}

401 - if unsuccessful**
```

Me **endpoint**

```jsx

**Request

curl -X GET http://localhost:8080/me -h"authorization: bearer $token"

Response

200 - if successful
{
  name: String
}

403 - if unauthorized**
```
