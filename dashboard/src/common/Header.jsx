import React, { Component } from 'react';
import { Navbar, NavbarBrand, Collapse, Nav, NavItem, NavLink } from 'reactstrap';
import { withRouter } from 'react-router-dom';

class Header extends Component {

    navigateHome = (e) => {
        e.preventDefault();
        this.props.history.push('/results');
    }

    render() {
        return (
            <React.Fragment>
                <Navbar color="white" expand="md" className="bg-white">
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
                <hr></hr>
            </React.Fragment>
        );
    }
}

export default withRouter(Header);
