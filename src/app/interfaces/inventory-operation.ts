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
  createdById?: number;
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
  confirmationNote: string;
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
  requestedById?: number;
  createdById?: number;
  actedOnById?: number;
  dateBatchRequested?: Date;
  dateAdded: Date;
}

export interface InventoryItemRequestRawMaterial {
  id: number;
  itemRequestId?: number;
  rawMaterialId?: number;
  packSizeId?: number;
  quantity: number;
  quantityInStore: number;
  dateAdded: Date;
}
