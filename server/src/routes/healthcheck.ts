import {Router} from "express";

// eslint-disable-next-line new-cap
const router = Router();

router.get("/", async (_req, res) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: "OK",
    timestamp: Date.now(),
  };

  res.send(healthcheck);
});

export default router;
