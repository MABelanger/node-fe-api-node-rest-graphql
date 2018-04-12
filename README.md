# node-fe-api-node-rest-graphql

```bash
$ git clone https://github.com/MABelanger/node-fe-api-node-rest-graphql
$ git branch -a
$ git checkout 01-minimum_server
```

```bash
$ brew install httpie
```

## Minimum files

### src/index.js
```js
import app from './server';

app.listen(3000, () => {
	console.log('server listen at port 3000')
})
```

### src/server.js
```js
import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.json({ok: true})
});

export default app;
```

## Install httpie
that equivalent of the postman
```bash
$ brew install httpie
```

## get
that equivalent of the postman
```bash
$ httpie localhost:3000
# or
$ curl -X GET -v localhost:3000
```

## get post put delete ... (all)
```js
// the all do all REST verb
// the * do all the route
app.all('*', (req, res) => {
  res.json({ok: true})
})
```

## hot mod reloading in dev
When we use webpack **hot reloading** the state is keep on the server, only the modified part is patched on the server. but with **nodemon** you lose the states.


### module.hot
module is global and is provided by webpack

### Routing
With node is depth first so it will check. You can add route with `express.Router()`. The route is not activated until is mounted to the root app. When we use `app.use()`, the root of the router is specified by the first parameter.

```js
const apiRouter = express.Router();
// GET -> /api = {api: true}
apiRouter.get('/', (req, res) => res.json({api: true}));
// Mount it to the root app.
app.use('/api', apiRouter);
```
