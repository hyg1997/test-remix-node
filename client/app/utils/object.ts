import type { ApiResponse } from "~/types";

export const updateItem = (
  data: ApiResponse,
  categoryId: string,
  itemId: string,
  value: number,
  type: "assets" | "liabilities"
) => {
  const updatedData = { ...data };

  for (const category of updatedData[type].categories) {
    if (category.id === categoryId) {
      category.items = category.items.map((item) => {
        if (item.id === itemId) {
          return { ...item, value };
        }
        return item;
      });
      break;
    }
  }

  return updatedData;
};
