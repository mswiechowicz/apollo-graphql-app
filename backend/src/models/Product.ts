import { Sequelize, DataTypes } from 'sequelize';

export const Product = (sequelize: Sequelize) =>
	sequelize.define('Product', {
		id: {
			primaryKey: true,
			allowNull: false,
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4(),
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		shortDescription: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		categoryId: {
			type: DataTypes.UUID,
			allowNull: false,
		},
		categoryDisplayName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		img: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		deleted: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		},
	});
