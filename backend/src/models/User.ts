// import bcrypt from 'bcrypt';
import { Sequelize, DataTypes } from 'sequelize';

export const User = (sequelize: Sequelize) =>
	sequelize.define('User', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
	});

// export default (sequelize: any, DataTypes: IDataTypes): IUser => {
// 	return sequelize.define(
// 		'User',
// 	{
// 		id: {
// 			primaryKey: true,
// 			allowNull: false,
// 			type: DataTypes.UUID,
// 			defaultValue: DataTypes.UUIDV4(),
// 		},
// 		username: {
// 			type: DataTypes.STRING,
// 			allowNull: false,
// 			unique: true,
// 			validate: {
// 				isAlphanumeric: {
// 					args: true,
// 					msg: 'W nazwie użytkownika dozwolone są wyłącznie znaki alfanumeryczne.',
// 				},
// 				len: {
// 					args: [4, 20],
// 					msg: 'Nazwa użytkownika musi zawierać od 4 do 20 znaków.',
// 				},
// 			},
// 		},
// 		password: {
// 			type: DataTypes.STRING,
// 			allowNull: false,
// 		},
// 		email: {
// 			type: DataTypes.STRING,
// 			allowNull: false,
// 			unique: true,
// 			validate: {
// 				isEmail: {
// 					args: true,
// 					msg: 'Niepoprawny adres e-mail.',
// 				},
// 			},
// 		},
// 		privilege: {
// 			type: DataTypes.STRING,
// 			allowNull: false,
// 			defaultValue: 'user',
// 		},
// 		active: {
// 			type: DataTypes.BOOLEAN,
// 			allowNull: false,
// 			defaultValue: false,
// 		},
// 	},
// 	{
// 		hooks: {
// 			beforeCreate: (user: IUser): void => {
// 				const salt = bcrypt.genSaltSync(10, 'a');
// 				user.password = bcrypt.hashSync(user.password, salt);
// 			},
// 		},
// 	}
// );
// };
