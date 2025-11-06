import EventEmitter from "events";
import pool from "../config/connect.js";

export const product_emitter = new EventEmitter();

product_emitter.on("productUpdated", async ({ oldProduct, newProduct }) => {
  try {
    await pool.query(
      `INSERT INTO product_history (product_id, old_data, new_data)
       VALUES ($1, $2, $3)`,
      [newProduct.id, oldProduct, newProduct]
    );
    console.log("Update history saved successfully!");
    console.log(" Old product:", oldProduct);
    console.log("New product:", newProduct);
  } catch (error) {
    console.error(" Error saving history:", error);
  }
});
