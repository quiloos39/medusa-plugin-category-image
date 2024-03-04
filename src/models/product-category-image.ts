import { BaseEntity, ProductCategory } from "@medusajs/medusa";
import { generateEntityId } from "@medusajs/utils";
import { BeforeInsert, Column, Entity, JoinColumn, OneToOne } from "typeorm";

@Entity()
export class ProductCategoryImage extends BaseEntity {
  @Column({ type: "varchar" })
  url: string | null;

  @OneToOne(() => ProductCategory, (category) => category.thumbnail)
  @JoinColumn({ name: "product_category_id" })
  category: ProductCategory;

  @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateEntityId(this.id, "category_image");
  }
}
