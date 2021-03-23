import React from 'react'
import {Button,Navbar,NavDropdown,Nav,Form,FormControl} from 'react-bootstrap'

function homepage(props) {
    const username=" "+props.name;
    return (
        
        <div>
            <div>
                <Navbar sticky="top" bg='dark' expand='lg' variant='dark' >
                    <Navbar.Brand>Profile_Builder</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse>
        
                            <Form.Control type="text" placeholder="Search" className="mr-sm-2"/>
                            <Button variant="outline-success">Search</Button>
                    
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                    <Nav.Link href="#home">GO BACK</Nav.Link>
                    <Nav.Link href="#link"><i class="bi bi-house-fill"></i>HOME</Nav.Link>
                        <NavDropdown title={<Navbar.Text>Signed in as: {username}</Navbar.Text>} id="basic-nav-dropdown">
                            <NavDropdown.Item href="#">Profile</NavDropdown.Item>
                            <NavDropdown.Item href="#">Settings</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#">Sign Out</NavDropdown.Item>
                        </NavDropdown>  
                    </Navbar.Collapse>
                </Navbar>
            </div>
        </div>
    )
}
export default homepage;