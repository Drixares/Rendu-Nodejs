import dotenv from 'dotenv';
import jwt from "jsonwebtoken";
dotenv.config()

export default function generateAccessToken(email) {
  return jwt.sign(
    {
      data: email
    }
    , process.env.TOKEN_SECRET, 
    {
      expiresIn: "24h"
    }
  );
}
