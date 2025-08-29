import Joi from 'joi';
import {
  createNewUser,
  getAllUsers,
  getUserDetails,
  updateUserDetails,
  deleteUserDetails
} from '../controllers/users.js';

const userSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  mobileNo: Joi.string().required(),
}).unknown(false);

const userIdSchema = Joi.object({
  userId: Joi.string().required(),
});

export default [
  {
    method: 'POST',
    path: '/users',
    handler: createNewUser,
    config: {
      description: 'Create a new user',
      tags: ['api', 'users'],
      auth: false,
      validate: {
        payload: userSchema,
      },
    },
  },
  {
    method: 'GET',
    path: '/users',
    handler: getAllUsers,
    config: {
      description: 'Get all users',
      tags: ['api', 'users'],
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/users/{userId}',
    handler: getUserDetails,
    config: {
      description: 'Get user details by ID',
      tags: ['api', 'users'],
      auth: false,
      validate: {
        params: userIdSchema,
      },
    },
  },
  {
    method: 'PUT',
    path: '/users/{userId}',
    handler: updateUserDetails,
    config: {
      description: 'Update user details by ID',
      tags: ['api', 'users'],
      auth: false,
      validate: {
        params: userIdSchema,
        payload: userSchema,
      },
    },
  },
  {
    method: 'DELETE',
    path: '/users/{userId}',
    handler: deleteUserDetails,
    config: {
      description: 'Delete user by ID',
      tags: ['api', 'users'],
      auth: false,
      validate: {
        params: userIdSchema,
      },
    },
  },
];
