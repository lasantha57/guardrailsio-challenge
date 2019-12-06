import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';

class Findings extends Component {

    back = () => {
        this.props.history.push('/results');
    }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col sm={6}>
                        <label><h3>Results</h3></label>
                    </Col>
                    <Col sm={6}>
                        <Button color="secondary float-right text-bold" onClick={() => this.back()}><i className="fas fa-plus"></i>  Back</Button>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>

                    </Col>
                </Row>
            </Container>);
    }
}

export default Findings;
