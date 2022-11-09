export interface CreateRoleVM {
  roleName: string;
  roleDescription: string;
  pages: number[];
}

export interface Role {
  id: number;
  roleName: string;
  roleDescription: string;
  rolePages: string[];
}

export interface UpdateRoleVM {
  roleName?: string;
  roleDescription?: string;
  pages?: number[];
}
