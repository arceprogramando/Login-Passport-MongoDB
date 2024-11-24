import multer from 'multer';
import { join } from 'path';
import __dirname from '../utils.js';

const uploadPath = join(__dirname, 'public', 'upload');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadPath);
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploadMiddleware = multer({
  storage,
  limits: { fileSize: 2000000 },
  fileFilter: (_req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif|PNG/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(file.originalname);
    if (mimetype && extname) {
      return cb(null, true);
    }
    return cb(new Error('Error: El archivo no es una imagen válida'));
  },
}).single('image');

export default uploadMiddleware;
