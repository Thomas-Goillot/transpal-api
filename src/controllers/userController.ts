import { Request, Response } from "express";
import User from "../models/user";

export const getUserProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findByPk(req.params.userId);

    if (!user) {
      res.status(404).json({ error: "Utilisateur non trouvé" });
      return;
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export const updateUserProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email } = req.body;
    const user = await User.findByPk(req.params.userId);

    if (!user) {
      res.status(404).json({ error: "Utilisateur non trouvé" });
      return;
    }

    user.name = name;
    user.email = email;
    await user.save();

    res.json(user);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Erreur lors de la mise à jour du profil utilisateur" });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findByPk(req.params.userId);

    if (!user) {
      res.status(404).json({ error: "Utilisateur non trouvé" });
      return;
    }

    await user.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};
