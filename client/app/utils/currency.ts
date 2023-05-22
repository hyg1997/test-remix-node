export const formatCurrency = (symbol: string, amount: number) => {
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);

  return `${symbol} ${formattedAmount.substring(1)}`;
};
