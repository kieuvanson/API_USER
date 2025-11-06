import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import pool from "./config/connect.js";
import router from "./router/product_router.js";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/product", router);

dotenv.config();
const PORT = process.env.PORT;
pool.connect();
app.listen(PORT, () => {
  console.log(`The Sever is running on port ${PORT}`);
});
