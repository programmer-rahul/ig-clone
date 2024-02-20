import jwt from "jsonwebtoken";

const generateAccessToken = ({ _id, email, username }) => {
  return jwt.sign(
    {
      _id,
      email,
      username,
    },
    process.env.ACCESS_TOKEN_KEY,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

const generateRefreshToken = ({ _id, email, username }) => {
  return jwt.sign(
    {
      _id,
      email,
      username,
    },
    process.env.REFRESH_TOKEN_KEY,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export { generateAccessToken, generateRefreshToken };
