import React, { Component, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

import { unregister } from './utils/http-intercept'; // register http interceptor
import Header from './common/Header';
import Navigation from './common/Navigation';
import ErrorHandler from './common/ErrorHandler';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const Results = lazy(() => import('./results/Results'));
const NewResult = lazy(() => import('./results/NewResult'));
const Findings = lazy(() => import('./results/Findings'));

class App extends Component {

    renderRoutes = () => {
        return (
            <Col sm={12} className="py-4">
                <Row>
                    <Col sm={12}>
                        <Suspense fallback={<div>Loading...</div>}>
                            <Switch>
                                <Route exact path="/results/new" component={NewResult} />
                                <Route exact path="/results/findings/:id" component={Findings} />
                                <Route exact path="/results" component={Results} />

                                <Redirect to="/results" />
                            </Switch>
                        </Suspense>
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
