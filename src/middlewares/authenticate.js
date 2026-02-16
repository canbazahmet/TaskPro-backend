import createHttpError from 'http-errors';

import { SessionsCollection } from '../db/Session.js';
import { UsersCollection } from '../db/User.js';

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
      return next(createHttpError(401, 'Please provide Authorization header'));
    }

    const [bearer, token] = authHeader.split(' ');
    if (bearer !== 'Bearer' || !token) {
      return next(createHttpError(401, 'Auth header should be of Bearer'));
    }

    const session = await SessionsCollection.findOne({
      accessToken: token,
    }).lean();
    if (!session) {
      return next(createHttpError(401, 'Session not found'));
    }

    const isAccessTokenExpired =
      Date.now() > new Date(session.accessTokenValidUntil).getTime();
    if (isAccessTokenExpired) {
      await SessionsCollection.deleteOne({ _id: session._id });
      return next(createHttpError(401, 'Access token expired'));
    }

    const user = await UsersCollection.findById(session.userId).select(
      '-password',
    );
    if (!user) {
      return next(createHttpError(401, 'User not found in database'));
    }

    req.user = user;

    return next();
  } catch (error) {
    return next(error);
  }
};
