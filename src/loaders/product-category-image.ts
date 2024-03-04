import { AwilixContainer } from "awilix";

export default async (container: AwilixContainer, config: Record<string, unknown>) => {
  const storeImports = (await import("@medusajs/medusa/dist/api/routes/store/product-categories/index")) as any;
  storeImports.defaultStoreProductCategoryRelations = [...storeImports.defaultStoreProductCategoryRelations, "thumbnail"];

  const adminImports = (await import("@medusajs/medusa/dist/api/routes/admin/product-categories/index")) as any;
  adminImports.defaultAdminProductCategoryRelations = [...adminImports.defaultAdminProductCategoryRelations, "thumbnail"];
};
