import express from 'express'
const router = express.Router();
import {getProducts, getProductById, createProducts, upadateProduct, deleteProduct} from '../controllers/productController.js'
import {protect, admin} from '../middleware/authMiddleware.js'
router.route('/').get(getProducts).post(protect, admin, createProducts)
router.route('/:id').get(getProductById).put(protect, admin, upadateProduct).delete(protect, admin, deleteProduct)


export default router