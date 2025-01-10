import express from "express";
const router = express.Router();
import {
  getProducts,
  getProductById,
  createProducts,
  upadateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
} from "../controllers/productController.js";
import checkObjectId from "../middleware/checkObjectId.js";
import { protect, admin } from "../middleware/authMiddleware.js";
router.route("/").get(getProducts).post(protect, admin, createProducts);
router.route("/top").get(getTopProducts);
router
  .route("/:id")
  .get(checkObjectId,getProductById)
  .put(protect, admin,checkObjectId, upadateProduct)
  .delete(protect, admin,checkObjectId, deleteProduct);
router.route("/:id/reviews").post(protect,checkObjectId, createProductReview);

export default router;
