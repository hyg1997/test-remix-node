import { Card, Col, Flex, Grid, Metric } from "@tremor/react";
import type { ActionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { formatCurrency } from "~/utils/currency";
import { calculateNetWorth, defaultData } from "~/api/netWorthCalculationApi";
import { useFetcher, useLoaderData } from "@remix-run/react";
import CurrencySelect from "~/components/CurrencySelect";
import AssetsCard from "~/components/AssetsCard";
import LiabilitiesCard from "~/components/LiabilitiesCard";
import { useEffect, useState } from "react";
import type { ApiResponse } from "~/types";
import Spinner from "~/components/Spinner";

export async function loader() {
  const data = await calculateNetWorth(defaultData);

  return json(data);
}

export const action = async ({ request }: ActionArgs) => {
  const { data } = Object.fromEntries(await request.formData());
  const newData = JSON.parse(data as string);

  return json(await calculateNetWorth(newData));
};

export default function Index() {
  const loaderData = useLoaderData<typeof loader>();
  const fetcher = useFetcher();
  const isLoading =
    fetcher.state === "submitting" || fetcher.state === "loading";

  const [data, setData] = useState<ApiResponse>(loaderData);
  const [currency, setCurrency] = useState<string>("USD");

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      setData({ ...loaderData, ...fetcher.data });
    }
  }, [fetcher, loaderData]);

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Grid className="gap-6" numColsSm={6}>
        <Col numColSpanMd={3} numColSpanLg={4}>
          <Card decoration="top" decorationColor="yellow">
            <Flex alignItems="center">
              <Metric>Networth</Metric>
              {isLoading ? (
                <Spinner />
              ) : (
                <Metric>{formatCurrency(data.symbol, data.netWorth)}</Metric>
              )}
            </Flex>
          </Card>
        </Col>
        <Col numColSpanMd={3} numColSpanLg={2}>
          <Card decoration="top" decorationColor="orange">
            <CurrencySelect
              fetcher={fetcher}
              data={data}
              currency={currency}
              setCurrency={setCurrency}
            />
          </Card>
        </Col>
        <Col numColSpanMd={3} numColSpanLg={3}>
          <Card decoration="top" decorationColor="green">
            <AssetsCard fetcher={fetcher} data={data} currency={currency} />
          </Card>
        </Col>
        <Col numColSpanMd={3} numColSpanLg={3}>
          <Card decoration="top" decorationColor="red">
            <LiabilitiesCard
              fetcher={fetcher}
              data={data}
              currency={currency}
            />
          </Card>
        </Col>
      </Grid>
    </main>
  );
}
