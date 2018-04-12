import express from 'express';

import { router } from './api'
import db from './db'

let app = express();

const apiRouter = express.Router();
db.connect();

app.use('/api', router);

// GET -> / = {root: true}
app.get('/', (req, res) => res.json({root: true}));

export default app;
