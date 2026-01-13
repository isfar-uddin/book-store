import jwt from "jsonwebtoken";

export const verifyToken = (tokenHeader) => {
  try {
    const token = tokenHeader.split(" ")[1];

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    return { token: decodedToken, error: null };
  } catch (error) {
    return { token: null, error: "Invalid token" };
  }
};
