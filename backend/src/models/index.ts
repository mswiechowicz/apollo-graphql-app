import { Sequelize } from 'sequelize';
import { User } from './User';
import { $db } from '../../config';
import { Models } from '../types';
import { Product } from './Product';

const { dialect, host, database, username, password } = $db;
const options = { host, dialect, charset: 'utf8', collate: 'utf8_unicode_ci' };
const sequelize = new Sequelize(database, username, password, options);

const models: Models = {
	User: User(sequelize),
	Product: Product(sequelize),
};

export { models, sequelize };
