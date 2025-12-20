import { eq } from "drizzle-orm";
import { randomBytes, createHmac } from "node:crypto";
import { usersSession, usersTable } from "../../models/userModel.js";
import { db } from "./../../db/index.js";

export const signupUser = async (req, res) => {
  const { name, email, password } = req.body;

  const [existingUser] = await db
    .select({ email: usersTable.email })
    .from(usersTable)
    .where((table) => eq(table.email, email));

  if (existingUser) {
    return res.status(400).json({ error: "User with email already exist." });
  }

  const salt = randomBytes(256).toString("hex");
  const hashedPassword = createHmac("sha256", salt)
    .update(password)
    .digest("hex");

  const [user] = await db
    .insert(usersTable)
    .values({
      name,
      email,
      password: hashedPassword,
      salt,
    })
    .returning({ id: usersTable.id });

  return res.status(201).json({ userId: user.id });
};

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
