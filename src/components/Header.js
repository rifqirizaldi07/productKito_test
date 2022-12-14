import React from "react";
import { Navbar, Container, Button } from "react-bootstrap";

const Header = () => {
  return (
    <div>
      <Navbar expand="lg" variant="light" bg="white">
        <Container fluid className="px-4">
          <Navbar.Brand href="/">ProductKito</Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              User Level : <a href="/">Admin</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <nav className='navbar-child'>
        <div className='container-fluid px-4'>
          <Button size='xl' variant="dark" disabled={true}>Product</Button>
        </div>
      </nav>
    </div >
  );
}

export default Header