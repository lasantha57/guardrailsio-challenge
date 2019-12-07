import React, { Component } from 'react';
import { Form, Row, Col, FormGroup, Label, Input, Button, Container } from 'reactstrap';
import { statusTypes } from '../utils/meta';
import CustomDropdown from '../common/CustomDropdown';

import { resultsService } from '../services/result-service';
class NewResult extends Component {

    INITIAL_STATE = {
        submitted: false,
        scanResult: {
            status: '',
            statusId: 1,
            repositoryName: '',
            queuedAt: new Date().toISOString(),
            scanningAt: new Date().toISOString(),
            finishedAt: new Date().toISOString(),
            findings: ''
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            ...this.INITIAL_STATE
        }

        console.log(this.INITIAL_STATE.scanResult.queuedAt)
    }

    back = () => {
        this.props.history.push('/results');
    }

    handleOnDropdownSelected = (selected, type) => {
        let scanResult = { ...this.state.scanResult };

        switch (type) {
            case 'statusId':
                scanResult.statusId = selected.id;
                break;
            default:
                break;
        }

        this.setState({ scanResult });
    }

    handleFormValueChange = (e) => {
        let scanResult = { ...this.state.scanResult };
        scanResult[e.target.name] = e.target.value;
        this.setState({
            scanResult
        });
    }

    addScanResult = () => {
        const { scanResult } = this.state;

        resultsService.saveOrUpdate(scanResult).then((response) => {
            if (response.statusCode === 200) {
                this.setState({
                    ...this.INITIAL_STATE
                });
                this.back();
            }
        }).catch((error) => {
            this.setState({
                ...this.INITIAL_STATE
            });
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
                        <Button color="success float-right text-bold ml-3" onClick={this.addScanResult}>Save Scan Result</Button>
                        <Button color="secondary float-right text-bold" onClick={this.back}>Back</Button>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        <Form>
                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="statusId">Status</Label>
                                        {statusTypes && statusTypes.length ?
                                            <CustomDropdown type={'statusId'} options={statusTypes} selectedId={scanResult.statusId} handleOnSelected={this.handleOnDropdownSelected}></CustomDropdown>
                                            : ''
                                        }
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="repositoryName">Repository</Label>
                                        <Input type="text" name="repositoryName" id="repository" value={scanResult.repositoryName} onChange={this.handleFormValueChange} placeholder="Repository" />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for="queuedAt">Queued At</Label>
                                        <Input type="datetime-local" name="queuedAt" id="queuedAt" value={scanResult.queuedAt} onChange={this.handleFormValueChange} />
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for="scanningAt">Scanning At</Label>
                                        <Input type="datetime-local" name="scanningAt" id="scanningAt" value={scanResult.scanningAt} onChange={this.handleFormValueChange} />
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for="finishedAt">Finished At</Label>
                                        <Input type="datetime-local" name="finishedAt" id="finishedAt" value={scanResult.scanningAt} onChange={this.handleFormValueChange} />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <FormGroup>
                                        <Label for="findings">Findings</Label>
                                        <Input type="textarea" rows="10" name="findings" placeholder="Enter Findings JSON" value={scanResult.findings} onChange={this.handleFormValueChange}></Input>
                                    </FormGroup>
                                </Col>
                            </Row>
                            {/* <Row className="py-4">
                                <Col md={12} >
                                    <div className="border-bottom"><h5>Add Finding</h5></div>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="ruleId">Rule Id</Label>
                                        <Input type="text" name="ruleId" id="ruleId" placeholder="Rule Id" />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="serverity">Severity</Label>
                                        <Input type="text" name="serverity" id="serverity" placeholder="Severity" />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <FormGroup>
                                        <Label for="description">Description</Label>
                                        <Input type="textarea" rows="3" name="description" placeholder="Description"></Input>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="pathName">Path Name</Label>
                                        <Input type="text" name="pathName" id="pathName" placeholder="Path Name" />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="codeLine">Code Line</Label>
                                        <Input type="text" name="codeLine" id="codeLine" placeholder="Code Line" />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={12}>
                                    <Button className="d-block float-right" color="success" onClick={this.addFinding}><i className="fas fa-plus"></i> Add</Button>
                                </Col>
                            </Row> */}
                        </Form>
                    </Col>
                </Row>
            </Container>);
    }
}

export default NewResult;
