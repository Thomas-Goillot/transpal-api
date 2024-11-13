import { Request, Response } from "express";
import User from "../models/user";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;
    const hashedPassword = password;
    const user = await User.create({ email, password: hashedPassword, name });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: "Erreur lors de l'inscription" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  // Implémentation de la connexion (vérification de l'email et du mot de passe)
};
