import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { usersSession, usersTable } from "../../models/userModel.js";

export const isAuthorized = async (req, res, next) => {
  const sessionId = req.headers["session-id"];

  if (!sessionId) {
    return res.status(401).json({
      error: "Unauthorized. No session token provided",
    });
  }

  const [data] = await db
    .select({
      sessionId: usersSession.id,
      userId: usersSession.userId,
      name: usersTable.name,
      email: usersTable.email,
    })
    .from(usersSession)
    .rightJoin(usersTable, eq(usersTable.id, usersSession.userId))
    .where((table) => eq(table.sessionId, sessionId));

  if (!data) {
    return res.status(401).json({
      error: "Invalid session",
    });
  }

  req.user = data;
  next();
};
