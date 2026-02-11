import mongoose from 'mongoose';

const initMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Mongo connection successfully!');
  } catch (error) {
    console.log('Error while setting up mongo connection', error);
  }
};

export default initMongoDB;
