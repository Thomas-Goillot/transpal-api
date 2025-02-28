import { Request, Response } from "express";
import Transaction from "../models/transaction";
import Account from "../models/account";
import { Op } from "sequelize";

export const sendMoney = async (req: Request, res: Response): Promise<void> => {
  try {
    const { senderId, receiverId, amount, currency } = req.body;

    const senderAccount = await Account.findOne({
      where: { userId: senderId },
    });
    const receiverAccount = await Account.findOne({
      where: { userId: receiverId },
    });

    if (!senderAccount || !receiverAccount) {
      res
        .status(404)
        .json({ error: "Compte expéditeur ou destinataire introuvable" });
      return;
    }

    if (senderAccount.balance < amount) {
      res.status(400).json({ error: "Solde insuffisant" });
      return;
    }

    senderAccount.balance = Number(senderAccount.balance);
    receiverAccount.balance = Number(receiverAccount.balance);

    senderAccount.balance -= amount;
    receiverAccount.balance += amount;
    await senderAccount.save();
    await receiverAccount.save();

    const transaction = await Transaction.create({
      senderId,
      receiverId,
      amount,
      currency,
      type: "SEND",
    });
    res.status(201).json(transaction);
    return;
  } catch (error) {
    res.status(400).json({ error: "Erreur lors de l'envoi d'argent" });
  }
};

export const getTransactionHistory = async (req: Request, res: Response) => {
  try {
    const transactions = await Transaction.findAll({
      where: {
      [Op.or]: [
        { senderId: req.params.userId },
        { receiverId: req.params.userId }
      ]
      }
    });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};
