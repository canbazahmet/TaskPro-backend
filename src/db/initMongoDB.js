import mongoose from 'mongoose';

import { env } from '../utils/env.js';

export const initMongoDB = async () => {
  try {
    const uri = env('MONGODB_URI');

    await mongoose.connect(uri);

    console.log('MongoDB connection established successfully');
  } catch (error) {
    console.error('Error establishing MongoDB connection:', error.message);
    throw error;
  }
};
