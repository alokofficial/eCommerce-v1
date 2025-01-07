import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/orderModel.js';


/**
 * @desc      create new order
 * @route     POST /api/orders
 * @access    Private
 */
const addOrderItems = asyncHandler(async(req, res) => {
    res.send('add order')
})
/**
 * @desc      Get Logged in user orders
 * @route     GET /api/orders/myorders
 * @access    Private
 */
const getMyOrders = asyncHandler(async(req, res) => {
    res.send('get my order')
})
/**
 * @desc      Get Order by ID
 * @route     GET /api/orders/:id
 * @access    Private
 */
const getOrderById = asyncHandler(async(req, res) => {
    res.send('get order by id')
})
/**
 * @desc      Update order to paid
 * @route     GET /api/orders/:id/pay
 * @access    Private/Admin
 */
const updateOrderToPaid = asyncHandler(async(req, res) => {
    res.send('update order to paid');
})

/**
 * @desc      Update to Delivered
 * @route     GET /api/orders/:id/deliver
 * @access    Private
 */
const updateOrderToDelivered = asyncHandler(async(req, res) => {
    res.send('update order to delivered')
})
/**
 * @desc      Get all orders
 * @route     GET /api/orders
 * @access    Private/Admin
 */
const getOrders = asyncHandler(async(req, res) => {
    res.send('get all orders')
})
export{
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders
}