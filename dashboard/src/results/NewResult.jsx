import React, { Component } from 'react';
import { Form, Row, Col, FormGroup, Label, Input, Button, Container } from 'reactstrap';

class NewResult extends Component {

    INITIAL_STATE = {
        submitted: false,
        scanResult: {
            status: '',
            repository: ''
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            ...this.INITIAL_STATE
        }
    }

    back = () => {
        this.props.history.push('/results');
    }

    handleFormValueChange = (e) => {
        let scanResult = { ...this.state.scanResult };
        scanResult[e.target.name] = e.target.value;
        this.setState({
            scanResult
        });
    }

    render() {

        const { scanResult } = this.state;

        return (
            <Container fluid>
                <Row>
                    <Col sm={6}>
                        <label><h3>Add New Scan Result</h3></label>
                    </Col>
                    <Col sm={6}>
                        <Button color="secondary float-right text-bold" onClick={() => this.back()}><i className="fas fa-plus"></i>  Back</Button>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        <Form>
                            <Row>
                                <Col md={6}>
                                    <FormGroup className="required">
                                        <Label for="status">Status</Label>
                                        <Input type="text" name="status" id="status" value={scanResult.status} onChange={this.handleFormValueChange} placeholder="Status" />
                                        {/* <span className="text-danger"><small>{this.validator.message('First Name', scanResult.firstName, 'required')}</small></span> */}
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup className="required">
                                        <Label for="repository">Repository</Label>
                                        <Input type="text" name="repository" id="repository" value={scanResult.repository} onChange={this.handleFormValueChange} placeholder="Repository" />
                                        {/* <span className="text-danger"><small>{this.validator.message('Last Name', scanResult.lastName, 'required')}</small></span> */}
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Container>);
    }
}

export default NewResult;
