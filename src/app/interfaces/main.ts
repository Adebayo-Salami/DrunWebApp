export const PagesEnum = {
  Dashboard: 1,
  Setup_Role: 2,
  Setup_Product: 3,
  Customer_Onboarding: 4,
  Customer_Ordering_CreateOrder: 5,
  Customer_Ordering_ViewOrders: 6,
  Customer_Reporting_CustomersVolume: 7,
  Customer_Reporting_DebtAgeAnalysis: 8,
  Customer_Reporting_ProductMix: 9,
  Customer_Ordering_ApproveOrder: 10,
  Setup_UserRole: 11,
  Setup_User: 12,
  Inventory_Setup: 13,
  Inventory_ItemRequest: 14,
  Inventory_ItemApproval: 15,
  Inventory_ItemStore: 16,
  Inventory_ItemConfirmation: 17,
  Customer_Ordering_ConfirmOrder: 18,
};
Object.freeze(PagesEnum); // Do Not Change Arrangement of this enum

export const ApprovalStatusEnum = {
  Pending: 1,
  Approved: 2,
  Rejected: 3,
};
Object.freeze(ApprovalStatusEnum);

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

export interface ResultVM<T = object> {
  isSuccessful: boolean;
  message: string;
  object: T;
  errorStack: string;
}
