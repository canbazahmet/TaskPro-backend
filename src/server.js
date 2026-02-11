import { swaggerDocs } from './middlewares/swaggerDocs.js';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { UPLOAD_DIR } from './constants/tempUpload.js';

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

  app.use('/uploads', express.static(UPLOAD_DIR));
  app.use('/api-docs', swaggerDocs());

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
