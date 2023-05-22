import { getCurrencySymbol } from "../utils/currency";

interface CurrencyApiResponse {
  rates: Record<string, number>;
}

const cache = {
  data: {} as Record<string, { rate: number }>,
  ttl: new Date(),
};

export const getCurrencyRate = async (
  fromCurrency: string,
  toCurrency: string
) => {
  const symbol = getCurrencySymbol(toCurrency);

  if (fromCurrency === toCurrency) {
    return { rate: 1, symbol };
  }

  const cacheKey = `${fromCurrency}-${toCurrency}`;

  if (cache.data[cacheKey] && cache.ttl > new Date()) {
    const { rate } = cache.data[cacheKey];

    return { rate, symbol };
  }

  const response = await fetch(
    `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data: unknown = await response.json();
  if (!isCurrencyApiResponse(data)) {
    throw new Error("Invalid API response");
  }
  const rate = data.rates[toCurrency];
  if (!rate) {
    throw new Error(`Unable to find rate for currency ${toCurrency}`);
  }

  const inverseCacheKey = `${toCurrency}-${fromCurrency}`;

  cache.data[cacheKey] = { rate };
  cache.data[inverseCacheKey] = {
    rate: 1 / rate,
  };
  cache.ttl = new Date(Date.now() + 24 * 60 * 60 * 1000);

  return { rate, symbol };
};

const isCurrencyApiResponse = (data: unknown): data is CurrencyApiResponse =>
  (data as CurrencyApiResponse).rates !== undefined;
