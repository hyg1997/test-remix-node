import {Request, Response, NextFunction} from "express";
import {getResults} from "../services/netWorthCalculationService";
import {getCurrencyRate} from "../services/currencyService";

export const calculateNetWorth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {fromCurrency, toCurrency, assets, liabilities} = req.body;

    const {rate, symbol} = await getCurrencyRate(fromCurrency, toCurrency);

    const results = getResults(assets, liabilities, rate);

    return res.json({...results, symbol});
  } catch (error) {
    return next(error);
  }
};
