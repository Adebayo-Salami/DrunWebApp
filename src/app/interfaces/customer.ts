export const MeansOfIdentificationEnum = {
  NIN: 1,
  BVN: 2,
  Drivers_License: 3,
  Voters_Card: 4,
};
Object.freeze(MeansOfIdentificationEnum);

export interface RegisterCustomerVM {
  name: string;
  mobile: string;
  meansOfIdentification: number;
  identificationNumber: string;
  address: string;
}

export interface UpdateCustomerVM {
  name?: string;
  mobile?: string;
  meansOfIdentification?: number;
  identificationNumber?: string;
  address?: string;
}

export interface CustomerVM {
  id: number;
  name: string;
  mobile: string;
  meansOfIdentification: number;
  identificationNumber: string;
  address: string;
  dateRegistered: Date;
}
