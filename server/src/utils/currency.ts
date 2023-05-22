enum CurrencyLocale {
  USD = "en-US",
  EUR = "en-EU",
  PEN = "es-PE",
}

export const getCurrencySymbol = (currencyCode: string): string => {
  if (!(currencyCode in CurrencyLocale)) {
    throw new Error(`Invalid currency code: ${currencyCode}`);
  }

  const locale = CurrencyLocale[currencyCode as keyof typeof CurrencyLocale];

  const formattedCurrency = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencyCode,
  }).format(0);

  const symbol = formattedCurrency.replace(/[0-9,.]/g, "").trim();

  return symbol;
};

export const isCurrencySupported = (currency: string): boolean => {
  return Object.keys(CurrencyLocale).includes(currency);
};
