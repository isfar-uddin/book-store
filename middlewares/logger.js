import fs from "node:fs";

export const loggerMiddleware = (req, res, next) => {
  const log = `[${Date.now()}] ${req.method} ${req.path}\n`;

  fs.appendFileSync('logs.txt', log, "utf-8");
  next();
};
