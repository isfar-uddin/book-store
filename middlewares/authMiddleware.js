import jwt from "jsonwebtoken";

export const authenticationMiddleware = async (req, res, next) => {
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

  try {
    const token = tokenHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET);

    next();
  } catch (error) {
    return res.status(401).json({
      error: "Invalid token",
    });
  }
};
