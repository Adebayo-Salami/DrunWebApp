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
  isApproved: boolean;
  isDeactivated?: boolean;
  userRoles: UserRole[];
  dateRegistered?: Date;
  registeredById?: number;
  address: string;
  role?: Role;
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
  lastName?: string;
  firstName?: string;
  othername?: string;
  codeName?: string;
  mobile?: string;
  roleIds?: number[];
  address?: string;
}
