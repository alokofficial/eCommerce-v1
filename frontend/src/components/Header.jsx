import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Badge, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import logo from '../assets/logo.png';
// import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
// import { redirect } from 'react-router-dom';
import { useLogOutMutation } from '../slices/usersApiSlice';
import { logOut } from '../slices/authSlice';
import { resetcart } from '../slices/cartSlice';
import SearchBox from './SearchBox';

const Header = () => {
  const { cartItems } = useSelector(state => state.cart);
  const { userInfo } = useSelector(state => state.auth);
  // console.log(cartItems);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logOutApiCall] = useLogOutMutation();
  const logoutHandler = async() => {
    try {
      await logOutApiCall().unwrap();
      dispatch(logOut());
      dispatch(resetcart());
      navigate('/login');
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <header>
        <Navbar bg="primary" variant="dark" expand="md" collapseOnSelect>
         <Container> 
          {/* need to use LinkContainer in order to use react router<Nav.Link href="/profile">{userInfo?.name}</Nav.Link> */}
            <Navbar.Brand href="/" style={{cursor: "pointer", textAlign:"left"}}>
                <img src={logo} alt="EpoxySneak"  style={{width: "40px", height: "40px", border: "1px solid #000", borderRadius: "50%", marginRight: "5px"}}/>
                    EpoxySneak
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <SearchBox />
                <Nav.Link href="/cart"> <FaShoppingCart /> Cart
                  {cartItems.length > 0 && <Badge pill bg='success' style={{marginLeft: "5px"}} className="badge">{cartItems.reduce((acc, curr) => acc + curr.qty, 0)}</Badge>}</Nav.Link>
                  {userInfo ? (
                    <NavDropdown title={userInfo?.name} id="username">
                      <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                      <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                    </NavDropdown>  
                  ) : (
                    <Nav.Link href="/login"> <FaUser /> Sign In</Nav.Link>
                  )}
                  {userInfo && userInfo.isAdmin && (
                    <NavDropdown title="Admin" id="adminmenu">
                      <NavDropdown.Item href="/admin/productlist">Products</NavDropdown.Item>
                      <NavDropdown.Item href="/admin/userlist">Users</NavDropdown.Item>
                      <NavDropdown.Item href="/admin/orderlist">Orders</NavDropdown.Item>
                    </NavDropdown>
                  )}
              </Nav>
            </Navbar.Collapse>
         </Container>
        </Navbar>   
    </header>
  )
}

export default Header