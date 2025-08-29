import Boom from '@hapi/boom';

import UsersModel from '../models/users.js';

export const createNewUser = async (req) => {
  try {
    const userFound = await UsersModel.findOne({ email: req.payload.email.toLowerCase() });
    if (userFound) {
      return Boom.conflict('User with this email already exists');
    }

    const user = new UsersModel(req.payload);
    const savedUser = await user.save();

    return savedUser;
  } catch (error) {
    return Boom.badRequest(error.message);
  }
};

export const getAllUsers = async () => {
  try {
    const users = await UsersModel.find({});
    return users;
  } catch (error) {
    return Boom.badRequest(error.message);
  }
};

export const getUserDetails = async (req) => {
  try {
    const userFound = await UsersModel.findOne({ _id: req.params.userId });
    if (!userFound) {
      return Boom.notFound("User with this ID doesn't exist");
    }

    return userFound;
  } catch (error) {
    return Boom.badRequest(error.message);
  }
};

export const updateUserDetails = async (req) => {
  try {
    const userFound = await UsersModel.findOne({ _id: req.params.userId });
    if (!userFound) {
      return Boom.notFound("User with this ID doesn't exist");
    }

    await UsersModel.replaceOne({ _id: req.params.userId }, req.payload);

    return { message: 'User updated successfully' };
  } catch (error) {
    return Boom.badRequest(error.message);
  }
};

export const deleteUserDetails = async (req) => {
  try {
    const userFound = await UsersModel.findOne({ _id: req.params.userId });
    if (!userFound) {
      return Boom.notFound("User with this ID doesn't exist");
    }

    await UsersModel.deleteOne({ _id: req.params.userId });

    return { message: 'User deleted successfully' };
  } catch (error) {
    return Boom.badRequest(error.message);
  }
};
