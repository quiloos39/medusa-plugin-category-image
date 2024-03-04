import { ProductCategory as MedusaProductCategory } from "@medusajs/medusa";
import { Entity, JoinColumn, OneToOne, Tree, TreeChildren, TreeParent } from "typeorm";
import { ProductCategoryImage } from "./product-category-image";

@Entity()
@Tree("materialized-path")
export class ProductCategory extends MedusaProductCategory {
  @OneToOne(() => ProductCategoryImage, (productCategoryImage) => productCategoryImage.category)
  thumbnail: ProductCategoryImage;

  @TreeParent()
  @JoinColumn({ name: "parent_category_id" })
  // @ts-ignore
  parent_category: ProductCategory | null;

  @TreeChildren({ cascade: true })
  // @ts-ignore
  category_children: ProductCategory[];
}
