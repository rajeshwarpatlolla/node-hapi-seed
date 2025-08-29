import jwt from 'jsonwebtoken';
import _ from 'lodash';
import bcrypt from 'bcrypt';
import Boom from '@hapi/boom';

import UsersModel from '../models/users.js';

export const registerUser = async (req) => {
  try {
    const userFound = await UsersModel.findOne({ email: req.payload.email.toLowerCase() });
    if (userFound) {
      return Boom.conflict('User with this email already exists');
    }
    req.payload.password = bcrypt.hashSync(req.payload.password, 10);
    const user = new UsersModel(req.payload);
    const savedUser = await user.save();
    return savedUser;
  } catch (error) {
    return Boom.badImplementation();
  }
};

export const loginUser = async (req) => {
  try {
    const user = await UsersModel.findOne({ email: req.payload.email.toLowerCase() });
    if (!user) {
      return Boom.notFound('User not found with the given email id');
    }
    const correctPwd = bcrypt.compareSync(req.payload.password, user.password);
    if (correctPwd) {
      const userData = _.pick(user, ['email', 'firstName', 'lastName']);
      const token = jwt.sign(userData, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_TOKEN_EXPIRES_IN });

      return {
        success: true,
        message: 'Login Successful',
        data: token,
        statusCode: 200,
      };
    }

    return Boom.unauthorized('Invalid password');
  } catch (error) {
    return Boom.badImplementation();
  }
};
