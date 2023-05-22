import { getResults } from "../../services/netWorthCalculationService";
import { Assets, Liabilities } from "../../types";

describe("netWorthCalculationService", () => {
  it("should calculate net worth correctly", () => {
    const assets: Assets = {
      total: 0,
      categories: [
        {
          id: "1",
          name: "Assets",
          items: [
            { id: "a1", name: "Asset 1", value: 100 },
            { id: "a2", name: "Asset 2", value: 200 },
          ],
        },
      ],
    };

    const liabilities: Liabilities = {
      total: 0,
      categories: [
        {
          id: "1",
          name: "Liabilities",
          items: [
            { id: "l1", name: "Liability 1", value: 50, monthlyPayment: 10 },
            { id: "l2", name: "Liability 2", value: 50, monthlyPayment: 10 },
          ],
        },
      ],
    };

    const currencyRate = 1.5;

    const results = getResults(assets, liabilities, currencyRate);

    expect(results.netWorth).toEqual(
      (assets.categories[0].items[0].value +
        assets.categories[0].items[1].value -
        liabilities.categories[0].items[0].value -
        liabilities.categories[0].items[1].value) *
        currencyRate
    );
    expect(results.assets.total).toEqual(
      (assets.categories[0].items[0].value +
        assets.categories[0].items[1].value) *
        currencyRate
    );
    expect(results.liabilities.total).toEqual(
      (liabilities.categories[0].items[0].value +
        liabilities.categories[0].items[1].value) *
        currencyRate
    );
  });
});
