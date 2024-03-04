import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { ProductCategoryImageRepository } from "../../../repositories/product-category-image";

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const { category_id, url } = req.body;

  if (!category_id) {
    return res.status(400).json({
      message: "category_id is required",
    });
  }

  if (!url) {
    return res.status(400).json({
      message: "url is required",
    });
  }

  const productCategoryImageRepository = req.scope.resolve<typeof ProductCategoryImageRepository>("productCategoryImageRepository");
  const productCategoryImage = await productCategoryImageRepository.findOne({
    where: {
      category: {
        id: category_id,
      },
    },
  });

  if (!productCategoryImage) {
    const productCategoryImage = productCategoryImageRepository.create({
      category: {
        id: category_id,
      },
      url,
    });
    await productCategoryImageRepository.save(productCategoryImage);
  } else {
    productCategoryImageRepository.update(productCategoryImage.id, {
      url,
    });
  }

  const responseProductCategoryImage = productCategoryImageRepository.findOne({
    where: {
      category: {
        id: category_id,
      },
    },
  });

  res.status(200).json(responseProductCategoryImage);
};
