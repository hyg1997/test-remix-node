import type { ApiRequestBody, ApiResponse } from "~/types";
import { v4 as uuidv4 } from "uuid";

const apiURL = "https://net-worth.onrender.com";

export const calculateNetWorth = async (
  requestBody: ApiRequestBody
): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${apiURL}/netWorthCalculation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const defaultData: ApiRequestBody = {
  fromCurrency: "USD",
  toCurrency: "USD",
  assets: {
    total: 2200427,
    categories: [
      {
        id: uuidv4(),
        name: "Cash and Investments",
        items: [
          { id: uuidv4(), name: "Chequing", value: 2000.0 },
          { id: uuidv4(), name: "Savings for Taxes", value: 4000.0 },
          { id: uuidv4(), name: "Rainy Day Fund", value: 506.0 },
          { id: uuidv4(), name: "Savings for Fun", value: 5000.0 },
          { id: uuidv4(), name: "Savings for Travel", value: 400.0 },
          {
            id: uuidv4(),
            name: "Savings for Personal Development",
            value: 200.0,
          },
          { id: uuidv4(), name: "Investment 1", value: 5000.0 },
          { id: uuidv4(), name: "Investment 2", value: 60000.0 },
          { id: uuidv4(), name: "Investment 3", value: 30000.0 },
          { id: uuidv4(), name: "Investment 4", value: 50000.0 },
          { id: uuidv4(), name: "Investment 5", value: 24000.0 },
        ],
      },
      {
        id: uuidv4(),
        name: "Long Term Assets",
        items: [
          { id: uuidv4(), name: "Primary Home", value: 455000.0 },
          { id: uuidv4(), name: "Second Home", value: 1564321.0 },
        ],
      },
      {
        id: uuidv4(),
        name: "Other",
        items: [],
      },
    ],
  },
  liabilities: {
    total: 908297.0,
    categories: [
      {
        id: uuidv4(),
        name: "Short Term Liabilities",
        items: [
          {
            id: uuidv4(),
            name: "Credit Card 1",
            monthlyPayment: 200,
            value: 4342,
          },
          {
            id: uuidv4(),
            name: "Credit Card 2",
            monthlyPayment: 150,
            value: 322,
          },
        ],
      },
      {
        id: uuidv4(),
        name: "Long Term Debt",
        items: [
          {
            id: uuidv4(),
            name: "Mortgage 1",
            monthlyPayment: 2000,
            value: 250999.0,
          },
          {
            id: uuidv4(),
            name: "Mortgage 2",
            monthlyPayment: 3500,
            value: 632634.0,
          },
          {
            id: uuidv4(),
            name: "Line of Credit",
            monthlyPayment: 500,
            value: 10000.0,
          },
          {
            id: uuidv4(),
            name: "Investment Loan",
            monthlyPayment: 700,
            value: 10000.0,
          },
        ],
      },
    ],
  },
};
