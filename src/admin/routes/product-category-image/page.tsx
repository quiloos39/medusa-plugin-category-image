import { RouteConfig } from "@medusajs/admin";
import { Spinner, Swatch, Plus } from "@medusajs/icons";
import { ProductCategory } from "@medusajs/medusa";
import { Container, Heading, Table } from "@medusajs/ui";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CategoryItem } from "./_components/CategoryItem";

export const client = axios.create({
  baseURL: process.env.MEDUSA_BACKEND_URL,
  withCredentials: true,
});

const Page = () => {
  const { data: categories } = useQuery({
    queryKey: ["product-category-images"],
    queryFn: async () => {
      const categories = await client
        .get("/admin/product-categories?limit=99999")
        .then((res) => res.data.product_categories as ProductCategory[]);
      return categories;
    },
  });

  return (
    <Container>
      <Heading className="mb-4" level="h1">
        Category Images
      </Heading>
      {!!categories ? (
        <Table>
          <Table.Header>
            <Table.HeaderCell>Thumbnail</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Header>
          <Table.Body>
            {categories.map((category) => (
              <CategoryItem key={category.id} category={category} />
            ))}
          </Table.Body>
        </Table>
      ) : (
        <Spinner className="animate-spin" />
      )}
    </Container>
  );
};

export default Page;

export const config: RouteConfig = {
  link: {
    label: "Category Images",
    icon: Plus,
  },
};
