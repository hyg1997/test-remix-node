
import "dotenv/config";
import express from "express";
import cors from "cors";
import healthcheck from "./routes/healthcheck";
import netWorthRoutes from "./routes/netWorthCalculationRoutes";
import errorHandler from "./middlewares/errorHandler";
import validationErrorHandler from "./middlewares/validationErrorHandler";

const PORT = process.env["PORT"];
const app = express();

app.use(cors({origin: true}));
app.use(express.json());

app.use("/", healthcheck);
app.use("/netWorthCalculation", netWorthRoutes);

app.use(validationErrorHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Net worth app listening on port ${PORT}`);
});
