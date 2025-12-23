import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { usersSession, usersTable } from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const isAuthorized = async (req, res, next) => {
  const tokenHeader = req.headers["authorization"];

  if (!tokenHeader) {
    return res.status(401).json({
      error: "Unauthorized. No token provided",
    });
  }

  if (!tokenHeader.startsWith("Bearer")) {
    return res.status(400).json({
      error: "Authorization token must start with Bearer",
    });
  }

  const token = tokenHeader.split(" ")[1];

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

  console.log("decoded", decodedToken);

  const [data] = await db
    .select({
      id: usersTable.id,
      name: usersTable.name,
      email: usersTable.email,
    })
    .from(usersTable)
    .where((table) => eq(table.id, decodedToken.id));

  if (!data) {
    return res.status(401).json({
      error: "Invalid token",
    });
  }

  req.user = data;
  next();
};
