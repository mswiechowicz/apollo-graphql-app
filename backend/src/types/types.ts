import { Model, InferAttributes, InferCreationAttributes } from 'sequelize';

// @ts-ignore
interface SequelizeAddition<T> extends Model<InferAttributes<T>, InferCreationAttributes<T>> {
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUser extends SequelizeAddition<IUser> {
  id: string;
  username: string;
  password: string;
  email: string;
  privilege: string;
  active: boolean;
}

export interface IProduct extends SequelizeAddition<IProduct> {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  categoryId: string;
  categoryDisplayName: string;
  img: string;
  deleted: boolean;
}

export interface Models {
  User: any;
  Product: any;
}
