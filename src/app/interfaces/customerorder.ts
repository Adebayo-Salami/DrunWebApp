export enum PackSizeEnum {
  One_Litre = 1,
  Four_Litre = 2,
  TwentyFive_Litre = 3,
  TwoHundred_Litre = 4,
}

export enum PaymentModeEnum {
  Cash = 1,
  Transfer = 2,
  Card = 3,
  Mixture = 4,
}

export interface CreateCustomerOrderVM {
  customerId: number;
  customerName: string;
  productId: number;
  productName: string;
  quantity: number;
  packSizeId: number;
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
  packSizeId?: number;
  unitPrice?: number;
  paymentMethod?: number;
  amountPaid?: number;
  datePaid?: Date;
}

export interface CustomerOrderVM {
  id: number;
  customerId: number;
  customerName: string;
  productId: number;
  productName: string;
  quantity: number;
  quantityConfirmed: number;
  packSizeId: number;
  unitPrice: number;
  amountToBePaid: number;
  paymentMode: number;
  amountPaid: number;
  additionalAmountPaid: number;
  datePaid: Date;
  customerOrderBatchId: number;
  confirmations: CustomerOrderConfirmationVM[];
  payments: CustomerOrderPaymentVM[];
}

export interface LogCustomerOrderBatchVM {
  batchName: string;
  batchDescription: string;
}

export interface CustomerOrderBatchVM {
  id: number;
  name: string;
  description: string;
  code: string;
  approvalStatus: number;
  customerOrders: CustomerOrderVM[];
  isSubmittedForApproval: boolean;
  CreatedBy: string;
  dateCreated: Date;
}

export interface ActOnBatchApprovalVM {
  batchId: number;
  isApproved: boolean;
  comment?: string;
}

export interface CustomerOrderConfirmationVM {
  id: number;
  customerOrderId?: number;
  quantityConfirmed: number;
  comment: string;
  dateCreated: Date;
}

export interface CustomerOrderPaymentVM {
  id: number;
  customerOrderId?: number;
  amountPaid: number;
  paymentMode: PaymentModeEnum;
  createdBy: string;
  dateCreated: Date;
}
