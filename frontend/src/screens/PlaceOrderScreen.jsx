import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { toast } from "react-toastify"
import {Button, Row, Col, ListGroup, Image, Card} from 'react-bootstrap'  
import CheckoutSteps from "../components/CheckoutSteps"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { useCreateOrderMutation } from "../slices/ordersApiSlice"
import { clearCartItems } from "../slices/cartSlice"


const PlaceOrderScreen = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const cart = useSelector((state) => state.cart)
    const { shippingAddress, paymentMethod, cartItems, itemsPrice, shippingPrice, taxPrice, totalPrice } = cart

    const [createOrder, {isLoading, error}] = useCreateOrderMutation()

    useEffect(() => {
        if(!shippingAddress.address){
            navigate('/shipping')
        }else if(!paymentMethod){
            navigate('/payment')
        }
        
    },[shippingAddress.address, paymentMethod, navigate])
  const checkOutHandler = async() => {
      try{
        const res = await createOrder({
              orderItems: cartItems,
              shippingAddress,
              paymentMethod,
              itemsPrice,
              shippingPrice,
              taxPrice,
              totalPrice
          }).unwrap()
          dispatch(clearCartItems())
          navigate(`/order/${res._id}`)
      }catch(err){
          toast.error(err?.data?.message || err.error)
      }finally{
          if(isLoading){
      }else{
          if(error){
          if(error?.status === 401){
              toast.error('Unauthorized')
          } else {
              toast.error(error?.data?.message || error?.error)
          }
      }
      }
      }
  }
  return (
    <>
        <CheckoutSteps step1 step2 step3 step4/>
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p>
                            <strong>Address:</strong>
                            {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.postalCode}, {shippingAddress.country}
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p>
                            <strong>Method:</strong>
                            {paymentMethod}
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {cartItems.length === 0 ? <Message variant='info'>Your cart is empty</Message> : (
                            <ListGroup variant='flush'>
                                {cartItems.map((item, index) => (
                                    <ListGroup.Item key={index}>
                                        <Row>
                                            <Col md={1}>
                                                <Image src={item.image} alt={item.name} fluid rounded />
                                            </Col>
                                            <Col>
                                                <Link to={`/product/${item._id}`}>{item.name}</Link>
                                            </Col>
                                            <Col md={4}>
                                                {item.qty} x ₹{item.price} = ₹{(item.qty * item.price).toFixed(2)}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}
                    </ListGroup.Item>
                        
                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Items</Col>
                                <Col>₹{cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>₹{shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Tax</Col>
                                <Col>₹{taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total</Col>
                                <Col>₹{totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            {error && <Message variant='danger'>{error?.data?.message || error?.error}</Message>}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type='button' className='btn-block' disabled={cartItems.length === 0} onClick={checkOutHandler}>Place Order</Button>
                            {isLoading && <Loader />}
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>  

    
    </>
  )
}

export default PlaceOrderScreen