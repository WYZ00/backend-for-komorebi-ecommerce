import { Request, Response } from "express";
import Product from "../models/product";
import { IProduct } from "../types";

type CreateProductRequestType = Pick<
  IProduct,
  "image" | "name" | "description" | "price"
>;

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { image, name, price, description }: CreateProductRequestType =
      req.body;

    const product = await Product.create({
      image,
      name,
      price,
      description,
    });
    res.send(product);
  } catch (error) {
    console.log("Error in createProduct", error);
    res.send({
      message: "Something went wrong while creating Product",
    });
    throw error;
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find({});
    res.send(products);
  } catch (error) {
    console.log("Error in getProducts", error);
    res.send({ message: "Something went wrong while getting products" });
    throw error;
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.send(product);
  } catch (error) {
    console.log("Error in getProductById", error);
    res.send({ message: "Something went wrong while getting products by Id" });
    throw Error;
  }
};

