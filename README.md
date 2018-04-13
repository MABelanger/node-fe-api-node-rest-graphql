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

## mongodb
https://mlab.com/ -> create an account and get an URL of mongodb://...
or install mongodb locally.

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

#### express.Router().param()
If inside the url /:id, execute function userController.findByParam(req, res, next, id)

express.Router().param('id', userController.findByParam)

Anytime the given string (e.g., id ) is present in the URL pattern of the route, and server receives a request that matches that route, the callback to the app.param() will be triggered. For example, with app.param('id', function(req, res, next, id){...}) and app.get('/users/:id', findUser) every time we have a request /id/1 or /id/2 , the closure in app.param() will be executed (before findUser).

The app.param() method is very similar to app.use() but it provides the value ( id in our example) as the fourth, last parameter, to the function. In this snippet, the id will have the value from the URL (e.g., 1 for /users/1):

It replace the need of declaring the route explicitly with the :id
```js
app.get('/api/users/:id', function(request, response, next) {
  var id = request.params.id;
  userController.findByParam(id, function(error, user) {
    if (error) return next(error);
    return response.render('user', user);
  });
});
```

#### express.Router().route()
It's chain able
```js
app.route('/')
		.get(userController.getAll)
		.post(userController.createOne)
```
It's a shortcut of app.get('/',...) and app.post('/'...)

```js
app.get('/', userController.getAll);
app.post('/', userController.createOne);
});
```

### The controller
router -> subRouter -> subRouter -> function... That function is the controller, it have in parameter the (req, res..., next) You can reuse controller in rest because each model doing the same thing CRUD...

* Access to incoming request
* Reuse controller as possible.
* Async or Sync (should be async for prod)
* Composable
* Can respond with anything (json, file, asset, buffer, stream...)

So any thing that respond, it's a controller. But it can be middleware to for example if you use authentication, the middleware can respond to.


When you call createOne(model) you get function(req, res, next) ...
```js
export const createOne = (model) => (req, res, next) => {

}

// === function that return a function.
function createOne(model){
	return function (req, res, next) {

	}
}
```

The best to reuse controller is to generate it with the model. Example.

```js
export const generateControllers = (model, overrides = {}) => {
  const defaults = {
    findByParam: findByParam(model),
    getAll: getAll(model),
    getOne: getOne(model),
    deleteOne: deleteOne(model),
    updateOne: updateOne(model),
    createOne: createOne(model)
  }

  return {...defaults, ...overrides}
}
```

It's easier to test only one controller instead of each controller from each model.

### The response
```js
// send watever you want and express will try to figure out
// what it is .. (string, image, )
res.send('hello')

// Used with the REST API
// set the application/JSON header HTTP
// Usually you can wrap up an abstraction of the json message
// to be consistent with the API.
res.json({...})

// change the status ex:. post request of 201
res.status(201).json({...})

// send the file back like html or templating
res.sendFile('/path...')
```
