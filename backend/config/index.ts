import 'dotenv/config';
import { Dialect } from 'sequelize';

type Db = {
  dialect: Dialect;
  host: string;
  port: string;
  database: string;
  username: string;
  password: string;
};

type Security = {
  secretKey: string;
  expiresIn: string;
};

type Server = {
  port: number;
};

// TODO Nie trzeba już dotenv/config w Bun, trzeba przerobić to
const {
  DB_DIALECT = '',
  DB_PORT = '',
  DB_HOST = '',
  DB_DATABASE = '',
  DB_USERNAME = '',
  DB_PASSWORD = '',
  JWT_SECRET = '',
  JWT_EXPIRATION_TIME = '',
} = process.env;

const db: Db = {
  dialect: DB_DIALECT as Dialect,
  port: DB_PORT,
  host: DB_HOST,
  database: DB_DATABASE,
  username: DB_USERNAME,
  password: DB_PASSWORD,
};

export const $db: Db = db;
export const $security: Security = {
  secretKey: JWT_SECRET,
  expiresIn: JWT_EXPIRATION_TIME,
};
export const $server: Server = {
  port: 4000,
};
