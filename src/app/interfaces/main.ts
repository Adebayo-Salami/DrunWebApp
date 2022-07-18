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
