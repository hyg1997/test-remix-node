import {Router} from "express";
import {check} from "express-validator";
import {calculateNetWorth} from "../controllers/netWorthCalculationController";
import {isCurrencySupported} from "../utils/currency";
import {
  Assets,
  Liabilities,
  AssetsCategory,
  LiabilitiesCategory,
  Asset,
  Liability,
} from "../types";

// eslint-disable-next-line new-cap
const router = Router();


const validateAssets = (value: Assets): boolean => {
  if (
    typeof value === "object" &&
    value !== null &&
    typeof value.total === "number" &&
    Array.isArray(value.categories) &&
    value.categories.every(validateAssetsCategory)
  ) {
    return true;
  }
  throw new Error("Invalid assets format");
};

const validateAssetsCategory = (category: AssetsCategory): boolean => {
  if (
    typeof category === "object" &&
    category !== null &&
    typeof category.id === "string" &&
    typeof category.name === "string" &&
    Array.isArray(category.items) &&
    category.items.every(validateAsset)
  ) {
    return true;
  }
  throw new Error("Invalid assets category format");
};


const validateAsset = (item: Asset): boolean => {
  if (
    typeof item === "object" &&
    item !== null &&
    typeof item.id === "string" &&
    typeof item.name === "string" &&
    typeof item.value === "number"
  ) {
    return true;
  }
  throw new Error("Invalid asset format");
};

const validateLiabilities = (value: Liabilities): boolean => {
  if (
    typeof value === "object" &&
    value !== null &&
    typeof value.total === "number" &&
    Array.isArray(value.categories) &&
    value.categories.every(validateLiabilitiesCategory)
  ) {
    return true;
  }
  throw new Error("Invalid liabilities format");
};


const validateLiabilitiesCategory = (category: LiabilitiesCategory): boolean => {
  if (
    typeof category === "object" &&
    category !== null &&
    typeof category.id === "string" &&
    typeof category.name === "string" &&
    Array.isArray(category.items) &&
    category.items.every(validateLiability)
  ) {
    return true;
  }
  throw new Error("Invalid liabilities category format");
};


const validateLiability = (item: Liability): boolean => {
  if (
    typeof item === "object" &&
    item !== null &&
    typeof item.id === "string" &&
    typeof item.name === "string" &&
    typeof item.value === "number" &&
    typeof item.monthlyPayment === "number"
  ) {
    return true;
  }
  throw new Error("Invalid liability format");
};

router.post(
  "/",
  [
    check("fromCurrency")
      .notEmpty()
      .withMessage("fromCurrency is required")
      .custom(isCurrencySupported)
      .withMessage("Unsupported currency for fromCurrency"),
    check("toCurrency")
      .notEmpty()
      .withMessage("toCurrency is required")
      .custom(isCurrencySupported)
      .withMessage("Unsupported currency for toCurrency"),
    check("assets")
      .custom(validateAssets)
      .withMessage("Invalid assets format"),
    check("liabilities")
      .custom(validateLiabilities)
      .withMessage("Invalid liabilities format"),
  ],
  calculateNetWorth
);

export default router;
