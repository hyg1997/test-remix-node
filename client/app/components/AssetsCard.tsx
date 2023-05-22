import { Fragment } from "react";
import {
  Title,
  Text,
  Flex,
  List,
  ListItem,
  Divider,
  Metric,
} from "@tremor/react";

import EditableText from "./EditableText";
import type { ApiResponse } from "~/types";
import { formatCurrency } from "~/utils/currency";
import type { FetcherWithComponents } from "@remix-run/react";
import { updateItem } from "~/utils/object";
import Spinner from "./Spinner";

export default function AssetsCard({
  data,
  fetcher,
  currency,
}: {
  data: ApiResponse;
  fetcher: FetcherWithComponents<any>;
  currency: string;
}) {
  const isLoading =
    fetcher.state === "submitting" || fetcher.state === "loading";

  const handleEnterPress = async (
    categoryId: string,
    itemId: string,
    newValue: number
  ) => {
    const newData = updateItem(data, categoryId, itemId, newValue, "assets");

    fetcher.submit(
      {
        data: JSON.stringify({
          ...newData,
          fromCurrency: currency,
          toCurrency: currency,
        }),
      },
      { method: "post", action: "/?index&type=assets" }
    );
  };

  return (
    <>
      <Flex alignItems="center" className="mb-6">
        <Metric>Assets</Metric>
        {isLoading && fetcher.formAction !== "/?index&type=liabilities"  ? (
          <Spinner />
        ) : (
          <Metric>{formatCurrency(data.symbol, data.assets.total)}</Metric>
        )}
      </Flex>
      {isLoading && fetcher.formAction === "/?index&type=currency"
        ? null
        : data.assets.categories.map((category, index) => (
            <Fragment key={category.id.toString()}>
              <Title>{category.name}</Title>
              <List className="mt-2">
                {category.items.map((item) => (
                  <ListItem key={item.id}>
                    <Flex alignItems="center">
                      <Text>{item.name}</Text>
                      <EditableText
                        defaultValue={item.value}
                        symbol={data.symbol}
                        onEnterPress={async (value: number) =>
                          await handleEnterPress(category.id, item.id, value)
                        }
                      />
                    </Flex>
                  </ListItem>
                ))}
              </List>
              {index !== data.assets.categories.length - 1 ? <Divider /> : null}
            </Fragment>
          ))}
    </>
  );
}
