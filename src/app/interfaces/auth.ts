import { ProfileVM } from "./user";

export interface AuthenticateUserVM {
  companyId?: number
  username: string;
  password: string;
}

export interface AuthSessionVM {
  token: string;
  userProfile: ProfileVM;
}
