// Typy
import { User, Sequelize } from './types';

// Sequelize
export interface IDataTypes {
	UUID: string;
	UUIDV4(): string;
	STRING: string;
	BOOLEAN: boolean;
	TEXT: string;
	INTEGER: number;
	DATE: string;
	FLOAT: number;
}

// Użytkownik
export interface IUser extends User, Sequelize {
	id: string;
	token?: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface ICreateUserInput extends User {}

export interface ILoginInput {
	email: string;
	password: string;
}

export interface IAuthPayload {
	token: string;
}

export interface Models {
	User: any;
	Product: any;
}
