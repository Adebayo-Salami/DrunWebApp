export enum InventoryItemTypeEnum {
  IsRawMaterial = 1,
  IsProduct = 2,
}

export interface CreateInventoryItemVM {
  name: string;
  description: string;
  isRawMaterial: boolean;
}

export interface InventoryItem {
  id: number;
  name: string;
  description: string;
  itemType: InventoryItemTypeEnum;
  dateAdded: Date;
}

export interface UpdateInventoryItemVM {
  name?: string;
  description?: string;
  isRawMaterial?: boolean;
}
