export interface CreatePackSizeVM {
  caption: string;
  description: string;
}

export interface PackSize {
  id: number;
  caption: string;
  description: string;
  dateAdded: Date;
}

export interface UpdatePackSizeVM {
  caption?: string;
  description?: string;
}
