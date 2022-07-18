import { ProfileVM } from "./user";

export interface AuthenticateUserVM {
  username: string;
  password: string;
}

export interface AuthSessionVM {
  token: string;
  userProfile: ProfileVM;
}
