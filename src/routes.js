import { Router } from 'express';

const routes = Router();

routes.post('/users', (req, res) => {
  return res.json(req.body);
});

export default routes;
