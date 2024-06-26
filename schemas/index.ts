import { CategorySchema } from "./category-schema";
import { GalleryImageSchema } from "./gallery-image-schema";
import { OrdersSchema } from "./orders-schema";
import { ProductSchema } from "./product-schema";
import { Settings } from "./settings-schema";
import { Promo } from "./promo-schema";
import { Pages } from "./pages-schema";
import { FeaturedProductsAndCategories } from "./top-categories-schema";

export const schemaTypes = [
  CategorySchema,
  GalleryImageSchema,
  ProductSchema,
  FeaturedProductsAndCategories,
  Settings,
  Promo,
  Pages,
  OrdersSchema
];
