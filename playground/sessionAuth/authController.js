import { eq } from "drizzle-orm";
import { createHmac } from "node:crypto";
import { usersSession, usersTable } from "../../models/userModel.js";
import { db } from "./../../db/index.js";

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const [existingUser] = await db
    .select({
      id: usersTable.id,
      email: usersTable.email,
      password: usersTable.password,
      salt: usersTable.salt,
    })
    .from(usersTable)
    .where((table) => eq(table.email, email));

  if (!existingUser) {
    return res.status(404).json({ error: "User with email does not exist." });
  }

  const { id, salt, password: existingPassword } = existingUser;

  const hashedPassword = createHmac("sha256", salt)
    .update(password)
    .digest("hex");

  if (hashedPassword !== existingPassword) {
    return res.status(400).json({ error: "Password is incorrect." });
  }

  const [session] = await db
    .insert(usersSession)
    .values({
      userId: id,
    })
    .returning({ sessionId: usersSession.id });

  return res.status(200).json({
    message: "User logged in successfully.",
    sessionId: session.sessionId,
  });
};

export const getUserInfo = async (req, res) => {
  const { user } = req;

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  return res.status(200).json({ user });
};

export const updateUser = async (req, res) => {
  const { user, body } = req;
  const { name } = body;

  await db
    .update(usersTable)
    .set({ name })
    .where(eq(usersTable.id, user.userId));

  return res.status(200).json({ message: "Updated successfully." });
};
