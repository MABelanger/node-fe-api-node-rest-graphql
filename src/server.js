import express from 'express';

let app = express();

const apiRouter = express.Router();

// GET -> /api = {api: true}
apiRouter.get('/', (req, res) => res.json({api: true}));

// Mount it to the root app.
app.use('/api', apiRouter);

// GET -> / = {root: true}
app.get('/', (req, res) => res.json({root: true}));

export default app;
