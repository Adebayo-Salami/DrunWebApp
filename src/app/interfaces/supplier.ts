export interface CreateSupplierVM {
  supplierName: string;
  supplierDescription: string;
  supplierLocation: string;
  contactPersonName: string;
  contactPersonMobile: string;
  contactPersonEmail: string;
  serviceCharge: number;
}

export interface ProductSupplier {
  id: number;
  supplierName: string;
  supplierDescription: string;
  supplierLocation: string;
  contactPersonName: string;
  contactPersonMobile: string;
  contactPersonEmail: string;
  serviceCharge: number;
  dateAdded: Date;
}

export interface UpdateSupplierVM {
  supplierName?: string;
  supplierDescription?: string;
  supplierLocation?: string;
  contactPersonName?: string;
  contactPersonMobile?: string;
  contactPersonEmail?: string;
  serviceCharge?: number;
}
