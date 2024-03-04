import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class ProductCategoryImage1709546845125 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "product_category_image",
        columns: [
          {
            name: "id",
            type: "varchar",
            isPrimary: true,
          },
          {
            name: "url",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "product_category_id",
            type: "varchar",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            columnNames: ["product_category_id"],
            referencedTableName: "product_category",
            referencedColumnNames: ["id"],
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("product_category_image");
  }
}
