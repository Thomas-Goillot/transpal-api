import { Request, Response } from "express";
import PaymentMethod from "../models/paymentMethod";

export const addPaymentMethod = async (req: Request, res: Response) => {
  try {
    const { type, name, cardNumber, expiryDate } = req.body;
    const paymentMethod = await PaymentMethod.create({
      userId: req.params.userId,
      type,
      name,
      cardNumber,
      expiryDate,
    });
    res.status(201).json(paymentMethod);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Erreur lors de l'ajout du moyen de paiement: " });
  }
};

export const getPaymentMethods = async (req: Request, res: Response) => {
  try {
    const paymentMethods = await PaymentMethod.findAll({
      where: { userId: req.params.userId },
    });
    res.json(paymentMethods);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export const deletePaymentMethod = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const paymentMethod = await PaymentMethod.findByPk(
      req.params.paymentMethodId
    );
    if (!paymentMethod) {
      res.status(404).json({ error: "Moyen de paiement introuvable" });
      return;
    }

    await paymentMethod.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};
