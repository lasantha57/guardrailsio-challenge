import React, { Component } from 'react';
import { Navbar, NavbarBrand, Collapse, Nav, NavItem, NavLink } from 'reactstrap';

class Header extends Component {

    navigateHome = (e) => {
        e.preventDefault();
        this.props.history.push('/dashboard');
    }

    render() {
        return (
            <Navbar color="white" expand="md" className="shadow-sm p-2  bg-white">
                <NavbarBrand style={{ zIndex: 100 }} className="pl-4 text-decoration-none text-muted" href="#" onClick={this.navigateHome}>
                    <h3>GuardRails.io</h3>
                </NavbarBrand>

                <Collapse navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink disabled href="#">Hi, there</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="#">Logout</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }
}

export default Header;
