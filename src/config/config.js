import { config } from 'dotenv';

config({
  path: `.env.${process.env.NODE_ENV || 'development'}.local`,
});

const {
  PORT,
  DB_CNN,
  DB_HOST,
  DB_NAME,
} = process.env;

const configObject = {
  PORT,
  DB_CNN,
  DB_HOST,
  DB_NAME,
};

export default configObject;
