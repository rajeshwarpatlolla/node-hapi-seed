import Joi from 'joi';
import { registerUser, loginUser } from '../controllers/auth.js';

const registerSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
}).unknown(false);

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
}).unknown(false);

export default [
  {
    method: 'POST',
    path: '/register',
    handler: registerUser,
    config: {
      description: 'Register a new user account',
      tags: ['api', 'auth'],
      auth: false,
      validate: {
        payload: registerSchema,
      },
    },
  },
  {
    method: 'POST',
    path: '/login',
    handler: loginUser,
    config: {
      description: 'Authenticate user and get JWT token',
      tags: ['api', 'auth'],
      auth: false,
      validate: {
        payload: loginSchema,
      },
    },
  },
];
