import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";

export const authenticate: RequestHandler = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Accès non autorisé" });
  }

  try {
    /* const secret = process.env.JWT_SECRET || "default_secret";
    const decoded = jwt.verify(token, secret);
    req.user = decoded; */
    next();
  } catch (error) {
    res.status(401).json({ error: "Token invalide ou expiré" });
  }
};
