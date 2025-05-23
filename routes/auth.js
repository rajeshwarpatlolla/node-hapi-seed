import Joi from 'joi';

import authController from '../controllers/auth.js';

const userJoiSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
}).unknown();

export default [
  {
    method: 'POST',
    path: '/register',
    handler: authController.registerUser,
    config: {
      description: 'Register the user',
      tags: ['api', 'auth'],
      auth: false,
      validate: {
        payload: userJoiSchema,
      },
    },
  },
  {
    method: 'POST',
    path: '/login',
    handler: authController.loginUser,
    config: {
      description: 'Login User',
      tags: ['api', 'auth'],
      auth: false,
      validate: {
        payload: Joi.object({
          email: Joi.string().email().required(),
          password: Joi.string().required(),
        }),
      },
    },
  },
];
