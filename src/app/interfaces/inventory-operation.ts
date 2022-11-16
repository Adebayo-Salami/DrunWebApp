export interface InventoryItemRequest {
  id: number;
  requestName: string;
  requestDescription: string;
  requestedItemId?: number;
  requestedPackSizeId?: number;
  requestedQuantity: number;
  unitPrice: number;
  productSupplierId?: number;
  isSentForApproval: boolean;
  dateSentForApproval?: Date;
  actedOnById?: number;
  dateActedOn?: Date;
  quantityConfirmed: number;
  isFullyConfirmed: boolean;
  rawMaterials: InventoryItemRequestRawMaterial[];
  dateAdded: Date;
}

export interface CreateInventoryItemRequestVM {
  requestName: string;
  requestDescription: string;
  requestedItemId: number;
  requestedPackSizeId: number;
  requestedQuantity: number;
  unitPrice: number;
  productSupplierId: number;
  rawMaterials: ItemRequestRawMaterialVM[];
}

export interface ItemRequestRawMaterialVM {
  itemId: number;
  packSizeId: number;
  quantity: number;
}

export interface UpdateInventoryItemRequestVM {
  requestName?: string;
  requestDescription?: string;
  requestedItemId?: number;
  requestedPackSizeId?: number;
  requestedQuantity?: number;
  unitPrice?: number;
  productSupplierId?: number;
  rawMaterials?: ItemRequestRawMaterialVM[];
}

export interface ActOnInventoryItemRequestVM {
  itemRequestId: number;
  isApproved: boolean;
}

export interface ConfirmInventoryItemRequestVM {
  itemRequestId: number;
  quantityConfirmed: number;
  confirmationNote: number;
}

export interface InventoryLog {
  id: number;
  inventoryStoreItemId?: number;
  unitPrice: number;
  requestBatchId?: number;
  requestBatchName: string;
  quantity: number;
  supplierServiceCharge?: number;
  supplierId?: number;
  supplierName: string;
  status: number;
  logNote: string;
  dateAdded: Date;
}

export interface InventoryItemRequestRawMaterial {
  id: number;
  itemRequestId?: number;
  rawMaterialId?: number;
  packSizeId?: number;
  quantity: number;
  dateAdded: Date;
}
