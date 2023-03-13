// !@TODO - Maybe break this into two interfaces, one for the user meta object

import { Role } from '../enums/role.enum';

// !and one for the user's password object.
export interface IUser {
  _id?: any; // !This is a string in the database, but it's an object in the code.
  email: string;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
  refreshToken?: string;
  role?: Role;
}
