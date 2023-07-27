import { Request, Response } from "express";
import { IOrder, IOrderItem } from "../types";
import Order from "../models/order";

import stripe from "stripe";

const stripeClient = new stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

type CreateOrderType = Pick<
  IOrder,
  "totalPrice" | "deliveryAddress" | "user" | "orderItems"
>;

const BASE_UNIT = 100;

const getTotalAmount = (orderItems: IOrderItem[]) => {
  return (
    orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0) *
    BASE_UNIT
  );
};

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { totalPrice, deliveryAddress, user, orderItems }: CreateOrderType =
      req.body;

    const totalAmount = getTotalAmount(orderItems);

    const paymentIntent = await stripeClient.paymentIntents.create({
      amount: totalAmount,
      currency: "inr",
    });

    const order = await Order.create({
      user,
      deliveryAddress,
      orderItems,
      totalPrice,
      paymentIntentId: paymentIntent.id,
      paymentStatus: "pending",
      paymentDetails: {},
    });
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.log("Error from createOrder", error);
    res.send({ message: "Something went wrong in create order" });
    throw error;
  }
};
