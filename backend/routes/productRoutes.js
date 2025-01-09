import express from 'express'
const router = express.Router();
import {getProducts, getProductById, createProducts, upadateProduct, deleteProduct, createProductReview} from '../controllers/productController.js'
import {protect, admin} from '../middleware/authMiddleware.js'
router.route('/').get(getProducts).post(protect, admin, createProducts)
router.route('/:id').get(getProductById).put(protect, admin, upadateProduct).delete(protect, admin, deleteProduct)
router.route('/:id/reviews').post(protect, createProductReview)

export default router