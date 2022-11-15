import { InventoryItem } from "./inventory-item";

export interface InventoryStoreSummaryVM {
  companyName: string;
  itemsInStoreCount: number;
  distinctItemsInStoreCount: number;
  totalInventoryValue: number;
}

export interface InventoryStoreItem {
  id: number;
  inventoryItemId?: number;
  packSizeId?: number;
  quantityInStore?: number;
  inventoryItem?: InventoryItem;
  dateAdded: Date;
}
