import { Sequelize } from 'sequelize';
import { User } from './User';
import { $db } from '../../config';
import { Models } from '../types';
import { Product } from './Product';

const { dialect, port, host, database, username, password } = $db;
const uri = `${dialect}://${username}:${password}@${host}:${port}/${database}`;
const sequelize = new Sequelize(uri);

const models: Models = {
  User: User(sequelize),
  Product: Product(sequelize),
};

export { models, sequelize };
