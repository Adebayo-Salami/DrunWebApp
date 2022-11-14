export const InventoryItemTypeEnum = {
  IsRawMaterial: 1,
  IsProduct: 2,
};
Object.freeze(InventoryItemTypeEnum);

export interface CreateInventoryItemVM {
  name: string;
  description: string;
  isRawMaterial: boolean;
}

export interface InventoryItem {
  id: number;
  name: string;
  description: string;
  itemType: number;
  dateAdded: Date;
}

export interface UpdateInventoryItemVM {
  name?: string;
  description?: string;
  isRawMaterial?: boolean;
}
