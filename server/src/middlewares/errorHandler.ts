import {Request, Response, NextFunction} from "express";

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }
  if (err.message.includes("Invalid API response") || err.message.includes("Invalid currency code")) {
    res.status(400);
  } else {
    res.status(500);
  }
  res.json({error: err.message});
};

export default errorHandler;
