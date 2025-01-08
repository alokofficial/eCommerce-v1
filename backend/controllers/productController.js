import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';


/**
 * @desc      Fetch all products
 * @route     GET /api/products
 * @access    Public
 */
const getProducts = asyncHandler(async(req, res) => {
    const products = await Product.find({});
    res.json(products)
})

/**
 * @desc      Fetch single product by id
 * @route     GET /api/products/:id
 * @access    Public
 * @param     {string} id - product id
 */
const getProductById =asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        return res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

/**
 * @desc      Create a products
 * @route     POST /api/products
 * @access    Private/Admin
 */
const createProducts = asyncHandler(async(req, res) => {
    const products = new Product({
        name: 'sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'sample brand',
        category: 'sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'sample description',
    })

    const createdProduct = await products.save();
    res.status(201).json(createdProduct)
})

export  {
    getProducts,
    getProductById,
    createProducts,
}