import { verifyToken } from "../utils/verifyToken.js";

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

  const { error } = verifyToken(tokenHeader);

  if (error) {
    return res.status(401).json({
      error: "Invalid token",
    });
  }

  next();
};

export const restrictToRole = function (role) {
  return function (req, res, next) {
    const tokenHeader = req.headers["authorization"];
    const { token, error } = verifyToken(tokenHeader);

    if (error) {
      return res.status(401).json({
        error: "Invalid token",
      });
    }

    if (token.role !== role) {
      return res
        .status(401)
        .json({ error: "You are not authorized to access this resource." });
    }

    next();
  };
};
