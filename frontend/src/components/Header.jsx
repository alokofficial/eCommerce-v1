import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Badge, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import logo from '../assets/logo.png';
// import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { redirect } from 'react-router-dom';
import { useLogOutMutation } from '../slices/usersApiSlice';
import { logOut } from '../slices/authSlice';

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
      navigate('/login');
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <header>
        <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
         <Container> 
          {/* need to use LinkContainer in order to use react router */}<Nav.Link href="/profile">{userInfo?.name}</Nav.Link>
            <Navbar.Brand href="/">
                <img src={logo} alt="ProShop" />
                    ProShop
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
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
              </Nav>
            </Navbar.Collapse>
         </Container>
        </Navbar>   
    </header>
  )
}

export default Header