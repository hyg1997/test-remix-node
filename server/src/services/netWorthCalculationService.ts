import {Assets, Liabilities, Result} from "../types";

export const getResults = (
  assets: Assets,
  liabilities: Liabilities,
  currencyRate: number
): Result => {
  const totalAssets = assets.categories.reduce(
    (total, category) =>
      total + category.items.reduce((sum, item) => sum + item.value, 0),
    0
  );

  const totalLiabilities = liabilities.categories.reduce(
    (total, category) =>
      total + category.items.reduce((sum, item) => sum + item.value, 0),
    0
  );

  const netWorth = (totalAssets - totalLiabilities) * currencyRate;

  const assetsResult: Assets = {
    total: totalAssets * currencyRate,
    categories: assets.categories.map((category) => ({
      id: category.id,
      name: category.name,
      items: category.items.map((item) => ({
        id: item.id,
        name: item.name,
        value: item.value * currencyRate,
      })),
    })),
  };

  const liabilitiesResult: Liabilities = {
    total: totalLiabilities * currencyRate,
    categories: liabilities.categories.map((category) => ({
      id: category.id,
      name: category.name,
      items: category.items.map((item) => ({
        id: item.id,
        name: item.name,
        monthlyPayment: item.monthlyPayment * currencyRate,
        value: item.value * currencyRate,
      })),
    })),
  };

  return {
    netWorth,
    assets: assetsResult,
    liabilities: liabilitiesResult,
  };
};
