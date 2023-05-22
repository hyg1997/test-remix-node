export type Asset = {
  id: string;
  name: string;
  value: number;
};

export type AssetsCategory = {
  id: string;
  name: string;
  items: Asset[];
};

export type Assets = {
  total: number;
  categories: AssetsCategory[];
};

export type Liability = {
  id: string;
  name: string;
  monthlyPayment: number;
  value: number;
};

export type LiabilitiesCategory = {
  id: string;
  name: string;
  items: Liability[];
};

export type Liabilities = {
  total: number;
  categories: LiabilitiesCategory[];
};

export type Result = {
  netWorth: number;
  assets: Assets;
  liabilities: Liabilities;
};

export type ApiRequestBody = {
  fromCurrency: string;
  toCurrency: string;
  assets: Assets;
  liabilities: Liabilities;
};

export type ApiResponse = {
  netWorth: number;
  assets: Assets;
  liabilities: Liabilities;
  symbol: string;
};
