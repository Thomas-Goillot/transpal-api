import { Request, Response } from "express";
import User from "../models/user";

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Erreur lors de la création de l'utilisateur" });
  }
};
