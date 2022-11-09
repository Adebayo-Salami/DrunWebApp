import { RoleVM } from "src/app/interfaces/role";
import { Role } from "./role";

export interface ProfileVM {
  id: number;
  lastname: string;
  othername: string;
  email: string;
  isApproved: boolean;
  userRoles: UserRole[];
}

export interface UserRole {
  id: number;
  roleId?: number;
  role?: Role;
  userId?: number;
  user?: User;
}

export interface User {
  id: number;
  profilePic: string;
  lastname: string;
  firstname: string;
  othername: string;
  mobile: string;
  email: string;
  password: string;
  authenticationToken: string;
  dateRegistered?: Date;
  lastLoginDate?: Date;
  isApproved: boolean;
  isDeactivated?: boolean;
  dateApproved?: Date;
  approvedById?: number;
  approvedBy?: User;
  companyId?: number;
  company?: any;
  roleId?: number;
  role?: Role;
  registeredById?: number;
}

export interface CreateUserVM {
  lastname: string;
  firstname: string;
  othername: string;
  codeName: string;
  phoneNumber: string;
  email: string;
  defaultPassword: string;
  assignedRoleId: number;
  address: string;
}

export interface UpdateProfileVM {
  othername: string;
  location: string;
  mobile: string;
  profileSummary: string;
  company: string;
  facebookUrl: string;
  instagramUrl: string;
  tweeterUrl: string;
  occupation: string;
  userId: number;
  dOB: Date;
}
