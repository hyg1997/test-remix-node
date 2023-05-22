import { Fragment } from "react";
import {
  Title,
  Grid,
  Col,
  List,
  ListItem,
  Divider,
  Text,
  Flex,
  Metric,
} from "@tremor/react";
import type { ApiResponse } from "~/types";
import EditableText from "./EditableText";
import { formatCurrency } from "~/utils/currency";
import type { FetcherWithComponents } from "@remix-run/react";
import { updateItem } from "~/utils/object";
import Spinner from "./Spinner";

export default function LiabilitiesCard({
  data,
  fetcher,
  currency,
}: {
  data: ApiResponse;
  fetcher: FetcherWithComponents<any>;
  currency: string;
}) {
  console.log(fetcher.formAction);

  const isLoading =
    fetcher.state === "submitting" || fetcher.state === "loading";

  const handleEnterPress = async (
    categoryId: string,
    itemId: string,
    newValue: number
  ) => {
    const newData = updateItem(
      data,
      categoryId,
      itemId,
      newValue,
      "liabilities"
    );

    fetcher.submit(
      {
        data: JSON.stringify({
          ...newData,
          fromCurrency: currency,
          toCurrency: currency,
        }),
      },
      { method: "post", action: "/?index&type=liabilities" }
    );
  };

  return (
    <>
      <Flex alignItems="center" className="mb-6">
        <Metric>Liabilities</Metric>
        {isLoading && fetcher.formAction !== "/?index&type=assets" ? (
          <Spinner />
        ) : (
          <Metric>{formatCurrency(data.symbol, data.liabilities.total)}</Metric>
        )}
      </Flex>
      {isLoading && fetcher.formAction === "/?index&type=currency"
        ? null
        : data.liabilities.categories.map((category, index) => (
            <Fragment key={category.id.toString()}>
              <Grid className="gap-3" numColsSm={5}>
                <Col numColSpanMd={2}>
                  <Title>{category.name}</Title>
                </Col>
                <Col numColSpanMd={2}>
                  <Title>Monthly Payment</Title>
                </Col>
              </Grid>
              <List className="mt-2">
                {category.items.map((item) => (
                  <ListItem key={item.id}>
                    <Grid className="gap-3 w-full" numColsSm={5}>
                      <Col numColSpanMd={2}>
                        <Text>{item.name}</Text>
                      </Col>
                      <Col numColSpanMd={2}>
                        <Text>
                          {formatCurrency(data.symbol, item.monthlyPayment)}
                        </Text>
                      </Col>
                      <Col numColSpanMd={1}>
                        <EditableText
                          defaultValue={item.value}
                          symbol={data.symbol}
                          onEnterPress={async (value: number) =>
                            await handleEnterPress(category.id, item.id, value)
                          }
                        />
                      </Col>
                    </Grid>
                  </ListItem>
                ))}
              </List>
              {index !== data.liabilities.categories.length - 1 && <Divider />}
            </Fragment>
          ))}
    </>
  );
}
