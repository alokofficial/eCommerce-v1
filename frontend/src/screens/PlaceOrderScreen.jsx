import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import {Button, Row, Col, ListGroup, Image, Cart} from 'react-bootstrap'  
import CheckoutSteps from "../components/CheckoutSteps"


const PlaceOrderScreen = () => {
    const navigate = useNavigate()

    const cart = useSelector((state) => state.cart)
    const { shippingAddress, paymentMethod, cartItems } = cart
    useEffect(() => {
        if(!shippingAddress.address){
            navigate('/shipping')
        }else if(!paymentMethod){
            navigate('/payment')
        }
        
    },[shippingAddress.address, paymentMethod, navigate])

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
                            {shippingAddress.address}, {shippingAddress.city}{' '}
                            {shippingAddress.postalCode}, {shippingAddress.country}
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p>
                            <strong>Method:</strong>
                            {paymentMethod}
                        </p>
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={4}>
                <ListGroup>
                    <ListGroup.Item>
                        <h2>Order Summary</h2>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Items</Col>
                            <Col>${cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)}</Col>
                        </Row>
                    </ListGroup.Item>
                </ListGroup>
            </Col>
        </Row>  

    
    </>
  )
}

export default PlaceOrderScreen