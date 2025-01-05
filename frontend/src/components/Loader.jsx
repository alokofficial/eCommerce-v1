import { Spinner } from 'react-bootstrap'
const Loader = () => {
  return (
    <Spinner 
    animation='border' 
    variant='primary'
    style={{
      width: '100px',
      height: '100px',
      margin: 'auto',
      marginTop: '20px',
      display: 'block'
    }} 
    />

  )
}

export default Loader