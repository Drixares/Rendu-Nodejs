import jwt from 'jsonwebtoken';
import { client } from '../config/prisma.js';

export function authentificateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET, (err, payload) => {

    if (err) return res.sendStatus(403);

    const user = client.user.findUnique({
      where: {
        email: payload.data,
      },
    });

    if (!user) return res.sendStatus(403);

    req.user = payload;

    next();
  });
}
