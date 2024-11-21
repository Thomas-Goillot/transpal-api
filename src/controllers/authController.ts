import { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";


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
  
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(401).json({ error: "Identifiants invalides" });
      return;
    }
    if (password !== user.password) {
      res.status(401).json({ error: "Identifiants invalides" });
      return;
    }
    // Générer un token JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: "1h" });

    res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erreur serveur" });
  }

};
