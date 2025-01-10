import { Table, Button, Row, Col} from 'react-bootstrap'
// import { LinkContainer } from 'react-router-bootstrap'
import {FaEdit, FaTrash} from 'react-icons/fa'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { useGetProductsQuery,useCreateProductMutation, useDeleteProductMutation } from '../../slices/productsApiSlice'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import Paginate from '../../components/Paginate'
const ProductListScreen = () => {
    const {pageNumber} = useParams()
    const {data, refetch, isLoading, error} = useGetProductsQuery({pageNumber})

    const [createProduct, {isLoading: loadingCreate}] = useCreateProductMutation()

    const [deleteProduct, {isLoading: loadingDelete}] = useDeleteProductMutation()

    const deleteHandler = async (id) => {
      if (window.confirm('Are you sure?')) {
        try {
          await deleteProduct(id)
          toast.success('Product deleted')
          refetch()
        } catch (err) {
          toast.error(err?.data?.message || err.error)
        }
      }
    }

    const createProductHandler = async () => {
      if(window.confirm ('Are you sure? You want to create a new product'))
      {
       try {
         const result = await createProduct()
         refetch()
         console.log(result)
       } catch (err) {
         toast.error(err?.data?.message || err.error)
       }
      }
    }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' variant='light' onClick={createProductHandler}>
            {/* <Link to='/admin/product/new'> */}
              <FaEdit /> Create Product
            {/* </Link> */}
          </Button>
        </Col>
      </Row>
      {loadingCreate && <Loader />}
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error?.data?.message || error.error}</Message>
      ) : (<>
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
              <th>  </th>
            </tr>
          </thead>
          <tbody>
            {data.products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>₹{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <Link to={`/admin/product/${product._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <FaEdit />
                    </Button>
                  </Link>
                  <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product._id)}>
                    <FaTrash style={{ color: 'white' }} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Paginate pages={data.pages} page={data.page} isAdmin={true} />
        </>
      )}
      {data?.products && data?.products?.length === 0 && (
        <Message>
          No products found. <Link onClick={createProductHandler}>Create one</Link>
        </Message>
      )}

    </>
  )
}

export default ProductListScreen