import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config();

const PORT = process.env.PORT;

export const setupServer = () => {
  const app = express();

  app.use(
    express.json({
      type: ['application/json', 'application/vnd.api+json'],
    }),
  );

  app.use(cors());

  app.use(cookieParser());

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
