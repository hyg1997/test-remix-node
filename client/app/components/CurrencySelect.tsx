import type { FetcherWithComponents } from "@remix-run/react";
import { Title, Flex, SelectBox, SelectBoxItem } from "@tremor/react";
import type { Dispatch, SetStateAction } from "react";
import type { ApiResponse } from "~/types";

export default function CurrencySelect({
  data,
  fetcher,
  currency,
  setCurrency,
}: {
  data: ApiResponse;
  fetcher: FetcherWithComponents<any>;
  currency: string;
  setCurrency: Dispatch<SetStateAction<string>>;
}) {
  return (
    <Flex alignItems="center">
      <Title>Currency</Title>
      <SelectBox
        defaultValue={currency}
        className="max-w-[30%] min-w-[8rem]"
        onValueChange={(value) => {
          fetcher.submit(
            {
              data: JSON.stringify({
                ...data,
                fromCurrency: currency,
                toCurrency: value,
              }),
            },
            { method: "post", action: "/?index&type=currency" }
          );
          setCurrency(value);
        }}
      >
        <SelectBoxItem value="USD" text="USD ($)" />
        <SelectBoxItem value="EUR" text="EUR (€)" />
        <SelectBoxItem value="PEN" text="PEN (S/)" />
      </SelectBox>
    </Flex>
  );
}
