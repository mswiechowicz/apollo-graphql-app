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
						msg: 'W nazwie użytkownika dozwolone są wyłącznie znaki alfanumeryczne.',
					},
					len: {
						args: [4, 20],
						msg: 'Nazwa użytkownika musi zawierać od 4 do 20 znaków.',
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
						msg: 'Niepoprawny adres e-mail.',
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
