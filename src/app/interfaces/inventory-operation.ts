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
