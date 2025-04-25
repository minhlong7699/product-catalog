export type ProductVariant = {
  id: string;
  sku: string;
  color?: string;
  size?: string;
  stock: number;
  price?: number;
};

export type Product = {
  _id: string;
  title: string;
  description: string;
  price: number;
  salePrice?: number;
  stock: number;
  sku: string;
  category: string;
  brand: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  imageUrl: string;
  images: string[];
  tags: string[];
  variants?: ProductVariant[];
  _creationTime: number;
};
