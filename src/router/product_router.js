import express from "express";
import {
  get_products,
  put_prodcuct,
  post_product,
  deleted_products,
} from "../controller/prodcut_controller.js";
const router = express.Router();
router.get("/", get_products);
router.put("/:id", put_prodcuct);
router.post("/", post_product);
router.delete("/:id", deleted_products);
export default router;
