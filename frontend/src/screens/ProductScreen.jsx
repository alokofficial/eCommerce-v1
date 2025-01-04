import { useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import {Row, Col, Image, ListGroup, Card, Button, Container, Badge} from 'react-bootstrap'
import Rating from '../components/Rating'

const ProductScreen = () => {
  const [product, setProducts] = useState({});
  const {id:productId}=useParams()

  useEffect(() => {
    const fetchProducts = async () => {
        const {data} = await axios.get(`/api/products/${productId}`);
        setProducts(data);
    }
    fetchProducts();
  },[productId])
    

  return (
    <Container>
      <Row className='my-3'>
        <Col md={3}>
          <a href="/" className='btn btn-light'>Go Back</a>
        </Col>
        <Col md={9}>
          <h1>{product.name}</h1>
        </Col>
      </Row>
      <Row>
        <Col md={5}>
          <Image src={product.image} alt={product.name} fluid/>
        </Col>
        <Col md={4}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
            </ListGroup.Item>
            <ListGroup.Item>
              Price: ${product.price}
            </ListGroup.Item>
            <ListGroup.Item>
              <Badge variant={product.countInStock > 0 ? 'success' : 'danger'}>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</Badge>
            </ListGroup.Item>
            <ListGroup.Item>
              Description: {product.description}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>${product.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button className='btn-block' type='button' disabled={product.countInStock === 0}>Add to Cart</Button>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default ProductScreen
