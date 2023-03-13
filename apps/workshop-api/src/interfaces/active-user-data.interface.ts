import { Role } from '../enums/role.enum';
export interface IActiveUserData {
  sub: string;
  email: string;
  role: Role;
}
