import { Get_products, Put_product, Post_product, Delete_product } from "../model/product_model.js";
export const get_products = async (req, res) => {
  try {
    const products = await Get_products();
    res.status(200).json({ message: "get product successfully", products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      message: error.message || "Internal server error",
    });
  }
};
export const put_prodcuct = async (req, res) => {
  try {
    const { id } = req.params;
    const { code, name, price, amount, attributes } = req.body;
    if (!code || !name || !price || !amount || !attributes) {
      return res.status(400).json({ message: "please fill in all the information" });
    }
    const put_prodcuct = await Put_product(req.params.id, {
      code,
      name,
      price,
      amount,
      attributes,
    });
    if (!put_prodcuct) {
      return res.status(404).json({ message: "product not found" });
    }
    res.status(200).json({ message: "Update product successfully", put_prodcuct });
  } catch (error) {
    console.error("Error Update product", error);
    res.status(500).json({
      message: error.message,
    });
  }
};
export const post_product = async (req, res) => {
  try {
    const { code, name, price, amount, attributes } = req.body;
    const post_product = await Post_product(code, name, price, amount, attributes);
    res.status(200).json({ message: "Product added successfully", post_product });
  } catch (error) {
    console.log("Error add product ", error);
    res.status(500).json({
      message: error.message,
    });
  }
};
export const deleted_products = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted_products = await Delete_product(id);
    res.status(200).json({ message: "products deleted successfully" });
  } catch (error) {
    console.log("error delete product ", error);
    res.status(500).json({
      message: error.message,
    });
  }
};
