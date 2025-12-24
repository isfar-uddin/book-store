import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { usersTable } from "../models/userModel.js";

export const getAllUsers = async (req, res) => {
  const { id, email, name } = usersTable;
  const users = await db
    .select({
      id,
      email,
      name,
    })
    .from(usersTable);

  return res.status(200).json({ users });
};

export const getUserById = async (req, res) => {
  console.log(req.params)
  const { id } = req.params;

  const [user] = await db
    .select({
      id: usersTable.id,
      email: usersTable.email,
      name: usersTable.name,
    })
    .from(usersTable)
    .where((table) => eq(table.id, id));

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  return res.status(200).json({ user });
};

export const updateUserById = async (req, res) => {
  const { params, body } = req;
  const { id } = params;
  const { name } = body;

  await db.update(usersTable).set({ name }).where(eq(usersTable.id, id));

  return res.status(200).json({ message: "Updated successfully." });
};
