import createHttpError from 'http-errors';
import fs from 'node:fs/promises';
import path from 'node:path';

import { THIRTY_DAYS } from '../constants/tokenLifetime.js';
import {
  getUserById,
  loginUser,
  logoutUser,
  refreshUserSession,
  registerUser,
  updateUser,
} from '../services/auth.js';
import { env } from '../utils/env.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { UPLOAD_DIR } from '../constants/tempUpload.js';

const getCookieOptions = () => {
  const isProd = env('NODE_ENV', 'development') === 'production';
  return {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
  };
};

const setupSession = (res, session) => {
  const cookieOptions = getCookieOptions();

  res.cookie('refreshToken', session.refreshToken, {
    ...cookieOptions,
    expires: new Date(Date.now() + THIRTY_DAYS),
  });

  res.cookie('sessionId', session._id, {
    ...cookieOptions,
    expires: new Date(Date.now() + THIRTY_DAYS),
  });
};

export const registerUsersController = async (req, res) => {
  await registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfuly registered a user!',
  });
};

export const loginUsersController = async (req, res) => {
  const session = await loginUser(req.body);

  setupSession(res, session);

  res.status(200).json({
    status: 200,
    message: 'Seccessfuly logged in an user',
    data: {
      accessToken: session.accessToken,
      userId: session.userId,
    },
  });
};

export const getUserController = async (req, res, next) => {
  const { _id } = req.user;

  const data = await getUserById(_id);

  if (!data) {
    next(createHttpError(404, `User with id ${_id} not found!`));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully found user with id ${_id}!`,
    data,
  });
};

export const updateUserController = async (req, res) => {
  const avatar = req.file;
  const { _id } = req.user;
  let avatarUrl;

  if (avatar && env('ENABLE_CLOUDINARY') === 'true') {
    avatarUrl = await saveFileToCloudinary(avatar);
  } else if (avatar) {
    const targetPath = path.join(UPLOAD_DIR, avatar.filename);
    await fs.rename(avatar.path, targetPath);
    avatarUrl = `/uploads/${avatar.filename}`;
  }

  const updateData = {
    ...req.body,
    ...(avatarUrl ? { avatar: avatarUrl } : {}),
  };
  const result = await updateUser({ _id }, updateData);

  if (!result) {
    throw createHttpError(404, 'User not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully updated user profile!',
    data: result.user,
  });
};

export const refreshUsersSessionController = async (req, res) => {
  if (!req.cookies.sessionId || !req.cookies.refreshToken) {
    throw createHttpError(401, 'Missing session credentials');
  }

  const session = await refreshUserSession({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  setupSession(res, session);

  res.status(200).json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const logoutUserController = async (req, res) => {
  if (req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId);
  }

  const cookieOptions = getCookieOptions();
  res.clearCookie('sessionId', cookieOptions);
  res.clearCookie('refreshToken', cookieOptions);

  res.status(204).send();
};
