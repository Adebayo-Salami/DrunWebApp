export const PagesEnum = {
  Dashboard: 1,
  Setup_Role: 2,
  Setup_Product: 3,
  Customer_Onboarding: 4,
  Customer_Ordering: 5,
  Customer_Reporting: 6,
};
Object.freeze(PagesEnum);

export interface Contact {
  firstName?: string;
  lastName?: string;
  fullName?: string;
  mobileNumber?: string;
  email?: string;
  designationId: number;
  designation?: Designation;
  clientContactQualificationId: number;
  dateOfBirth?: string;
  type?: number;
  id?: number;
  gender?: string;
  title?: string;
}

export interface Designation {
  id?: number;
  caption?: string;
  description?: string;
}

export interface ResultVM {
  isSuccessful: boolean;
  message: string;
  object: object;
}
