import { getCurrencyRate } from "../../services/currencyService";

describe("currencyService", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("should get the correct currency rate", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ rates: { EUR: 0.85 } }));

    const { rate } = await getCurrencyRate("USD", "EUR");

    expect(rate).toEqual(0.85);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      "https://api.exchangerate-api.com/v4/latest/USD"
    );
  });

  it("should throw an error when the fetch response is missing the requested rate", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ rates: { EUR: 0.85 } }));

    await expect(getCurrencyRate("USD", "PEN")).rejects.toThrow(
      "Unable to find rate for currency PEN"
    );
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      "https://api.exchangerate-api.com/v4/latest/USD"
    );
  });

  it("should use cached value instead of fetching the api", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ rates: { EUR: 0.85 } }));

    const { rate } = await getCurrencyRate("USD", "EUR");
    expect(rate).toBe(0.85);
    expect(fetch).toHaveBeenCalledTimes(0);
  });

  it("should use inversedCachedKey value instead of fetching the api", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ rates: { PEN: 3.69 } }));

    const { rate: rate1 } = await getCurrencyRate("USD", "PEN");
    expect(rate1).toBe(3.69);
    expect(fetch).toHaveBeenCalledTimes(1);

    const { rate: rate2 } = await getCurrencyRate("PEN", "USD");
    expect(rate2).toBe(1 / 3.69);
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
