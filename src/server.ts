import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectToDatabase from "./db";
import productRoutes from "./routes/product";

const app = express();
app.use(express.json());

connectToDatabase();

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.use("/products", productRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server up and running at port", PORT);
});
