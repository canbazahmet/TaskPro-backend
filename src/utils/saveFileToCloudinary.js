import cloudinary from 'cloudinary';
import fs from 'node:fs/promises';
import createHttpError from 'http-errors';

import { env } from './env.js';
import { CLOUDINARY } from '../constants/cloudinary.js';

cloudinary.v2.config({
  secure: true,
  cloud_name: env(CLOUDINARY.CLOUD_NAME),
  api_key: env(CLOUDINARY.API_KEY),
  api_secret: env(CLOUDINARY.API_SECRET),
});

export const saveFileToCloudinary = async (file) => {
  try {
    if (!file || !file.path) {
      throw createHttpError(400, 'No file provided');
    }

    const response = await cloudinary.v2.uploader.upload(file.path, {
      resource_type: 'auto',
      folder: 'uploads',
    });

    await fs.unlink(file.path);
    return response.secure_url;
  } catch (error) {
    try {
      if (file?.path) {
        await fs.unlink(file.path);
      }
    } catch (unlinkError) {
      // Ignore cleanup errors
    }
    throw error;
  }
};
