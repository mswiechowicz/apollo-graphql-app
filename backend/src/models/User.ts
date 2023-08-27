import bcrypt from 'bcryptjs';
import { Sequelize, DataTypes } from 'sequelize';
import { IUser } from '../types';

export const User = (sequelize: Sequelize) => {
  return sequelize.define<IUser>(
    'User',
    {
      id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4(),
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isAlphanumeric: {
            msg: 'Only alphanumeric characters are allowed in the username.',
          },
          len: {
            args: [4, 20],
            msg: 'The username must contain between 4 and 20 characters.',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: 'Incorrect email address.',
          },
        },
      },
      privilege: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user',
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      hooks: {
        beforeCreate: (user: IUser): void => {
          const salt = bcrypt.genSaltSync(10);
          user.password = bcrypt.hashSync(user.password, salt);
        },
      },
    }
  );
};
