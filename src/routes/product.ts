import express from "express";
import {
  createProduct,
  getProductById,
  getProducts,
} from "../controller/product";

const productRoutes = express.Router();

productRoutes.get("/", getProducts);
productRoutes.post("/", createProduct);
productRoutes.get("/:id", getProductById);

export default productRoutes;
