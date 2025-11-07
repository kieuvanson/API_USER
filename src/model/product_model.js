import pool from "../config/connect.js";
import { product_emitter } from "../event/save_history_products.js";

export const Get_products = async () => {
  const result = await pool.query("SELECT * FROM products ORDER BY id ASC");
  return result.rows;
};
export const Put_product = async (id, newData) => {
  const oldProductRes = await pool.query("SELECT * FROM products WHERE id = $1", [id]);
  const oldProduct = oldProductRes.rows[0];
  await pool.query(
    "UPDATE products SET code =$1,name = $2, price = $3, amount=$4,attributes =$5 WHERE id = $6",
    [newData.code, newData.name, newData.price, newData.amount, newData.attributes, id]
  );
  const newProductRes = await pool.query("SELECT * FROM products WHERE id = $1", [id]);
  const newProduct = newProductRes.rows[0];
  product_emitter.emit("productUpdated", { oldProduct, newProduct });
  return newProduct;
};
export const Post_product = async (code, name, price, amount, attributes) => {
  const result = await pool.query(
    "INSERT INTO products (code, name, price, amount,attributes) VALUES ($1, $2, $3, $4,$5) RETURNING *",
    [code, name, price, amount, attributes]
  );
  return result.rows[0];
};
export const Delete_product = async (id) => {
  await pool.query("DELETE FROM products WHERE id = $1", [id]);
  return { message: "products deleted successfully" };
};
export const checkCodeduplicate = async (code) => {
  const result = await pool.query('SELECT * FROM users WHERE code = $1', [code]);
  return result.rows[0];
};