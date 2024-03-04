import { EllipsisHorizontal } from "@medusajs/icons";
import { ProductCategory } from "@medusajs/medusa";
import { DropdownMenu, Table } from "@medusajs/ui";
import { useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { client } from "../page";

export const CategoryItem = ({ category }: { category: ProductCategory }) => {
  const thumbnail = category.thumbnail?.url;
  const queryClient = useQueryClient();
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Table.Row>
      <Table.Cell>
        <img src={thumbnail} className="w-10 h-10 bg-gray-100 object-cover" />
      </Table.Cell>
      <Table.Cell>
        <p>{category.name}</p>
      </Table.Cell>
      <Table.Cell>
        <input
          type="file"
          ref={inputRef}
          className="hidden"
          accept="image/*"
          onChange={async (e) => {
            const file = e.target.files[0];
            if (!file) {
              return;
            }
            const form = new FormData();
            form.append("files", file);
            const uploads = await client.post("/admin/uploads", form).then(
              (res) =>
                res.data as {
                  uploads: {
                    url: string;
                    key: string;
                  }[];
                }
            );
            await client.post("/admin/product-category-image", {
              category_id: category.id,
              url: uploads.uploads[0].url,
            });
            queryClient.invalidateQueries({
              queryKey: ["product-category-images"],
            });
          }}
        />
        <DropdownMenu>
          <DropdownMenu.Trigger>
            <EllipsisHorizontal />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item
              onClick={() => {
                if (inputRef.current) {
                  inputRef.current.click();
                }
              }}
            >
              Edit
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu>
      </Table.Cell>
    </Table.Row>
  );
};
