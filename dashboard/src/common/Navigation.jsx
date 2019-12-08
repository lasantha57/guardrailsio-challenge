import React, { Component } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { withRouter } from 'react-router-dom';

class Navigation extends Component {

    navigateTo = to => e => {
        e.preventDefault();
        this.props.history.push(`/${to}`);
    }

    render() {

        return (
            <Nav vertical className="pl-2">
                <NavItem className="py-1 pt-3">
                    <NavLink href="/#" className="text-muted" onClick={this.navigateTo('dashboard')}><i className="fas fa-tachometer-alt pr-2"></i> Dashboard</NavLink>
                </NavItem>
                <NavItem className="py-1 pt-3">
                    <NavLink href="/#" className="text-muted" onClick={this.navigateTo('results')}><i className="fas fa-tachometer-alt pr-2"></i> Results</NavLink>
                </NavItem>
            </Nav>
        );
    }
}

export default withRouter(Navigation);
