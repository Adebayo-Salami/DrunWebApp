export const PackSizeEnum = {
  One_Litre: 1,
  Four_Litre: 2,
  TwentyFive_Litre: 3,
  TwoHundred_Litre: 4,
};
Object.freeze(PackSizeEnum);

export const PaymentModeEnum = {
  Cash: 1,
  Transfer: 2,
  Card: 3,
};
Object.freeze(PaymentModeEnum);

export interface CreateCustomerOrderVM {
  customerId: number;
  customerName: string;
  productId: number;
  productName: string;
  quantity: number;
  packSize: number;
  unitPrice: number;
  paymentMethod: number;
  amountPaid: number;
  datePaid: Date;
}

export interface UpdateCustomerOrderVM {
  customerId?: number;
  customerName?: string;
  productId?: number;
  productName?: string;
  quantity?: number;
  packSize?: number;
  unitPrice?: number;
  paymentMethod?: number;
  amountPaid?: number;
  datePaid?: Date;
}
