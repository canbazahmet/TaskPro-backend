import mongoose from 'mongoose';

import { env } from '../utils/env.js';

export const initMongoDB = async () => {
  try {
    const uri = env('MONGODB_URI');

    await mongoose.connect(uri);

    console.log('Mongo connection successfully!');
  } catch (error) {
    console.log('Error while setting up mongo connection', error);
    throw error;
  }
};
