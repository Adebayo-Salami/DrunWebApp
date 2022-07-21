export interface CreateRoleVM {
  roleName: string;
  roleDescription: string;
  pages: number[];
}

export interface RoleVM {
  id: number;
  roleName: string;
  roleDescription: string;
  rolePages: string[];
}
