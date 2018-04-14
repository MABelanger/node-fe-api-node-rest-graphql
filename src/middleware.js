import bodyParser from 'body-parser';

const setGlobalMiddleware = (app) => {
  app.use(bodyParser.urlencoded({extended: true}));
  // Enable access req.body with the json sended by the client.
  app.use(bodyParser.json());
}

export default setGlobalMiddleware
