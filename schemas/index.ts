import { CategorySchema } from "./category-schema";
import { GalleryImageSchema } from "./gallery-image-schema";
import { ProductSchema } from "./product-schema";
import { todoSchema } from "./todo-schema";
import { FeaturedProductsAndCategories } from "./top-categories-schema";

export const schemaTypes = [
  CategorySchema,
  GalleryImageSchema,
  ProductSchema,
  FeaturedProductsAndCategories,
  todoSchema,
];
