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

    return {
      success: true,
      message: 'User created successfully',
      data: savedUser,
      statusCode: 201,
    };
  } catch (error) {
    return Boom.badImplementation();
  }
};

export const getAllUsers = async () => {
  try {
    const users = await UsersModel.find({});

    return {
      success: true,
      message: 'Users retrieved successfully',
      data: users,
      statusCode: 200,
    };
  } catch (error) {
    return Boom.badImplementation();
  }
};

export const getUserDetails = async (req) => {
  try {
    const userFound = await UsersModel.findOne({ _id: req.params.userId });
    if (!userFound) {
      return Boom.notFound("User with this ID doesn't exist");
    }

    return {
      success: true,
      message: 'User details retrieved successfully',
      data: userFound,
      statusCode: 200,
    };
  } catch (error) {
    return Boom.badImplementation();
  }
};

export const updateUserDetails = async (req) => {
  try {
    const userFound = await UsersModel.findOne({ _id: req.params.userId });
    if (!userFound) {
      return Boom.notFound("User with this ID doesn't exist");
    }
    await UsersModel.replaceOne({ _id: req.params.userId }, req.payload);

    return {
      success: true,
      message: 'User updated successfully',
      statusCode: 200,
    };
  } catch (error) {
    return Boom.badImplementation();
  }
};

export const deleteUserDetails = async (req) => {
  try {
    const userFound = await UsersModel.findOne({ _id: req.params.userId });
    if (!userFound) {
      return Boom.notFound("User with this ID doesn't exist");
    }
    await UsersModel.deleteOne({ _id: req.params.userId });

    return {
      success: true,
      message: 'User deleted successfully',
      statusCode: 200,
    };
  } catch (error) {
    return Boom.badImplementation();
  }
};
