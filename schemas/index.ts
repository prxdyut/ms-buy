import { CategorySchema } from "./category-schema";
import { GalleryImageSchema } from "./gallery-image-schema";
import { OrdersSchema } from "./orders-schema";
import { ProductSchema } from "./product-schema";
import { Policies } from "./policies-schema";
import { FeaturedProductsAndCategories } from "./top-categories-schema";

export const schemaTypes = [
  CategorySchema,
  GalleryImageSchema,
  ProductSchema,
  FeaturedProductsAndCategories,
  Policies,
  OrdersSchema
];
