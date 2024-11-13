import { Request, Response } from "express";
import Account from "../models/account";

export const getAccountBalance = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    let account = await Account.findOne({
      where: { userId: req.params.userId },
    });
    if (!account) {
      res.status(404).json({ error: "Compte non trouvé" });
    }

    if (!account) {
      account = await Account.create({
        userId: req.params.userId,
        balance: 0,
      });
    }

    res.json({ balance: account.balance });
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export const addFunds = async (req: Request, res: Response): Promise<void> => {
  try {
    const { amount } = req.body;
    let account = await Account.findOne({
      where: { userId: req.params.userId },
    });
    if (!account) res.status(404).json({ error: "Compte non trouvé" });

    if (amount < 0) res.status(400).json({ error: "Montant invalide" });

    if (!account) {
      account = await Account.create({
        userId: req.params.userId,
        balance: amount,
      });
    }

    account.balance += amount;
    await account.save();

    res.json(account);
  } catch (error) {
    res.status(400).json({ error: "Erreur lors de l'ajout de fonds" });
  }
};

export const withdrawFunds = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { amount } = req.body;
    let account = await Account.findOne({
      where: { userId: req.params.userId },
    });
    if (!account) res.status(404).json({ error: "Compte non trouvé" });

    if (amount < 0) res.status(400).json({ error: "Montant invalide" });

    if (!account) {
      account = await Account.create({
        userId: req.params.userId,
        balance: 0,
      });
    }

    if (account.balance < amount)
      res.status(400).json({ error: "Solde insuffisant" });

    account.balance -= amount;
    await account.save();

    res.json(account);
  } catch (error) {
    res.status(400).json({ error: "Erreur lors du retrait" });
  }
};
