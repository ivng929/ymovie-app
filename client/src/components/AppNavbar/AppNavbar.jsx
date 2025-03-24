import React, { useState } from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, NavLink } from 'react-router-dom'
import './AppNavbar.css';


function AppNavbar() {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => setExpanded((prev) => !prev)
  
  const handleNavSelect = () => {
    if (window.innerWidth < 992){
      setExpanded(false)
    }
  }
  
  return (
    <div className="navbar-container">
      <Navbar collapseOnSelect className="shadow-sm" expand="lg" variant='dark' expanded={expanded}>
        <Container fluid>
          <Navbar.Brand as={Link} to='/'>YMovie</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={handleToggle}/>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
                {/* <NavDropdown title="My movies" id="collapsible-nav-dropdown">
                  <NavDropdown.Item as={NavLink} to='' className={({isActive}) => isActive ? "active" : ""}>Favourites</NavDropdown.Item>
                </NavDropdown> */}
                <NavLink to='/home' className={ ({isActive}) => isActive ? 'nav-link active' : 'nav-link'} onClick={handleNavSelect}>Home</NavLink>
                <NavLink to='/movies' className={ ({isActive}) => isActive ? 'nav-link active' : 'nav-link'} onClick={handleNavSelect}>Movies</NavLink>
                <NavLink to='/tv' className={ ({isActive}) => isActive ? 'nav-link active' : 'nav-link'} onClick={handleNavSelect}>TV Shows</NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default AppNavbar
