import { Router } from 'express';
import axios from 'axios';
import Dev from './models/Dev';

const routes = Router();

routes.post('/devs', async (req, res) => {
  const { github_username, techs, latitude, longitude } = req.body;

  const apiResponse = await axios.get(
    `https://api.github.com/users/${github_username}`
  );

  const { name = login, avatar_url, bio } = apiResponse.data;

  const techsArrays = techs.split(',').map(tech => tech.trim());

  const location = {
    type: 'Point',
    coordinates: [longitude, latitude],
  };

  const dev = await Dev.create({
    github_username,
    name,
    avatar_url,
    bio,
    techs: techsArrays,
    location,
  });

  return res.json(dev);
});

export default routes;
