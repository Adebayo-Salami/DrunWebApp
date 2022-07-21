import { RoleVM } from "src/app/interfaces/role";
import { Role } from "./role";
export interface ProfileVM {
  id: number;
  lastname: string;
  othername: string;
  email: string;
  isApproved: boolean;
  role: RoleVM;
}

export interface User {
  id: number;
  lastName: string;
  othername: string;
  mobile: string;
  email: string;
  password: string;
  authenticationToken: string;
  dateRegistered?: Date;
  lastLoginDate?: Date;
  isApproved: boolean;
  dateApproved?: Date;
  approvedById?: number;
  approvedBy?: User;
  companyId?: number;
  company?: any;
  roleId?: number;
  role?: Role;
}
