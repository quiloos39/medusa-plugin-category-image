import { dataSource } from "@medusajs/medusa/dist/loaders/database";
import { ProductCategoryImage } from "../models/product-category-image";

export const ProductCategoryImageRepository = dataSource.getRepository(ProductCategoryImage);
export default ProductCategoryImageRepository;
