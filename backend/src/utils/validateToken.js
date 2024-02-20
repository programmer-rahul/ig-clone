import jwt from "jsonwebtoken";

export const validateToken = (token, key) => {
  return jwt.verify(token, key);
};
