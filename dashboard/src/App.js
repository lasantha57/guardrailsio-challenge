import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

import { unregister } from './utils/http-intercept'; // register http interceptor
import Header from './common/Header';
import Navigation from './common/Navigation';
import Results from './results/Results';
import NewResult from './results/NewResult';
import Findings from './results/Findings';
import ErrorHandler from './common/ErrorHandler';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {

    renderRoutes = () => {
        return (
            <Col sm={12} className="py-4">
                <Row>
                    <Col sm={12}>
                        <Switch>
                            <Route exact path="/results/new" component={NewResult} />
                            <Route exact path="/results/findings/:id" component={Findings} />
                            <Route exact path="/results" component={Results} />

                            <Redirect to="/results" />
                        </Switch>
                    </Col>
                </Row>
            </Col>
        )
    }

    renderHeader = () => {
        return (
            <Row>
                <Col sm={12}>
                    <Header></Header>
                </Col>
            </Row>
        )
    }

    renderNavigation = () => {
        return (
            <Col md={2} className="d-none d-md-block bg-white shadow-sm">
                <Navigation></Navigation>
            </Col>
        )
    }

    render() {
        return (
            <Container className="App bg-white">

                <Router>
                    {this.renderHeader()}

                    <Row>
                        <ErrorHandler>{this.renderRoutes()}</ErrorHandler>
                    </Row>
                </Router>
            </Container>
        );
    }
}

export default App;
