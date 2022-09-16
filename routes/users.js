const Joi = require('joi');
const usersController = require('../controllers/users');

const userJoiSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string()
    .email()
    .required(),
  mobileNo: Joi.string().required(),
}).unknown();

module.exports = [
  {
    method: 'POST',
    path: '/users',
    handler: usersController.createNewUser,
    config: {
      description: 'Create a new user',
      tags: ['api', 'users'],
      auth: false,
      validate: {
        payload: userJoiSchema,
      },
    },
  },
  {
    method: 'GET',
    path: '/users',
    handler: usersController.getAllUsers,
    config: {
      description: 'Get all users',
      tags: ['api', 'users'],
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/users/{userId}',
    handler: usersController.getUserDetails,
    config: {
      description: 'Get user details',
      tags: ['api', 'users'],
      auth: false,
      validate: {
        params: Joi.object({
          userId: Joi.string().required(),
        }),
      },
    },
  },
  {
    method: 'PUT',
    path: '/users/{userId}',
    handler: usersController.updateUserDetails,
    config: {
      description: 'Update user details',
      tags: ['api', 'users'],
      auth: false,
      validate: {
        params: Joi.object({
          userId: Joi.string().required(),
        }),
        payload: userJoiSchema,
      },
    },
  },
  {
    method: 'DELETE',
    path: '/users/{userId}',
    handler: usersController.deleteUserDetails,
    config: {
      description: 'Delete user details',
      tags: ['api', 'users'],
      auth: false,
      validate: {
        params: Joi.object({
          userId: Joi.string().required(),
        }),
      },
    },
  },
];
