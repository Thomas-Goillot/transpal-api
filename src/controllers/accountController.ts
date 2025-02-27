import { Request, Response } from "express";
import Account from "../models/account";
import Transaction from "../models/transaction";

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
    const userId = req.params.userId;
    let account = await Account.findOne({
      where: { userId: userId },
    });

    if (!account) {
      account = await Account.create({
        userId: req.params.userId,
        balance: amount,
      });

      await Transaction.create({
        senderId: userId,
        receiverId: userId,
        amount,
        currency: "€",
        type: "ADD_FUNDS",
      });

      res.json(account);
      return;
    }

    if (amount < 0) {
      res.status(400).json({ error: "Montant invalide" });
      return;
    }

    account.balance = Number(account.balance);
    account.balance += amount;

    await account.save();

    await Transaction.create({
      senderId: userId,
      receiverId: userId,
      amount,
      currency: "€",
      type: "ADD_FUNDS",
    });

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
    const userId = req.params.userId;
    let account = await Account.findOne({
      where: { userId: userId },
    });

    if (!account) {
      res.status(404).json({ error: "Compte non trouvé" });
      return;
    }

    if (amount < 0) {
      res.status(400).json({ error: "Montant invalide" });
      return;
    }

    if (account.balance < amount) {
      res.status(400).json({ error: "Solde insuffisant" });
      return;
    }

    account.balance = Number(account.balance);
    account.balance -= amount;
    await account.save();

    await Transaction.create({
      senderId: userId,
      receiverId: userId,
      amount,
      currency: "€",
      type: "WITHDRAW",
    });

    res.json(account);
  } catch (error) {
    res.status(400).json({ error: "Erreur lors du retrait" });
  }
};
