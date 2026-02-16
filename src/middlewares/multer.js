import multer from 'multer';
import path from 'node:path';
import createHttpError from 'http-errors';

import { TEMP_UPLOAD_DIR } from '../constants/tempUpload.js';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, TEMP_UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    const safeName = path
      .basename(file.originalname)
      .replace(/[^a-zA-Z0-9_.-]/g, '_');
    cb(null, `${uniqueSuffix}_${safeName}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  if (!allowed.includes(file.mimetype)) {
    return cb(createHttpError(400, 'Invalid file type'));
  }

  return cb(null, true);
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});
