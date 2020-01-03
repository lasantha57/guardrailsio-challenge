import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Row, Col, FormGroup, Label, Input, Button, Container } from 'reactstrap';
import { statusTypes } from '../utils/meta';

import CustomDropdown from '../common/CustomDropdown';
import { resultsService } from '../services/result-service';

const formatDate = () => {
    return new Date().toISOString().split('.')[0];
}

const NewResult = () => {

    const INITIAL_STATE = {
        scanResult: {
            status: '',
            statusId: 1,
            repositoryName: '',
            queuedAt: formatDate(),
            scanningAt: formatDate(),
            finishedAt: formatDate(),
            findings: ''
        }
    }

    const [scanResult, setScanResult] = useState(INITIAL_STATE.scanResult);
    const history = useHistory();

    const back = () => {
        history.push('/results');
    }

    const handleOnDropdownSelected = (selected, type) => {
        switch (type) {
            case 'statusId':
                scanResult.statusId = selected.id;
                break;
            default:
                break;
        }
        setScanResult({ ...scanResult });
    }

    const handleFormValueChange = (e) => {
        scanResult[e.target.name] = e.target.value;
        setScanResult({ ...scanResult });
    }

    const addScanResult = async () => {
        try {
            const response = await resultsService.saveOrUpdate(scanResult);
            if (response.statusCode === 200) {
                resetResultState();
                back();
            }
        } catch (error) {
            resetResultState();
        }
    }

    const resetResultState = () => {
        setScanResult({ ...INITIAL_STATE.scanResult });
    }

    const isValidJSONString = (str) => {
        if (str) {
            try {
                JSON.parse(str);
            } catch (e) {
                return false;
            }
        }
        return true;
    }

    const isFormValid = () => {
        return scanResult.repositoryName && scanResult.scanningAt && scanResult.finishedAt && scanResult.queuedAt && isValidJSONString(scanResult.findings);
    }

    return (
        <Container fluid>
            <Row>
                <Col sm={6}>
                    <label><h3>Add New Scan Result</h3></label>
                </Col>
                <Col sm={6}>
                    <Button disabled={!isFormValid()} color="success float-right text-bold ml-3" onClick={addScanResult}>Save Scan Result</Button>
                    <Button color="secondary float-right text-bold" onClick={back}>Back</Button>
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
                                        <CustomDropdown type={'statusId'} options={statusTypes} selectedId={scanResult.statusId} handleOnSelected={handleOnDropdownSelected}></CustomDropdown>
                                        : ''
                                    }
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="repositoryName">Repository</Label>
                                    <Input type="text" name="repositoryName" id="repository" value={scanResult.repositoryName} onChange={handleFormValueChange} placeholder="Repository" />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="queuedAt">Queued At</Label>
                                    <Input type="datetime-local" name="queuedAt" id="queuedAt" value={scanResult.queuedAt} onChange={handleFormValueChange} />
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="scanningAt">Scanning At</Label>
                                    <Input type="datetime-local" name="scanningAt" id="scanningAt" value={scanResult.scanningAt} onChange={handleFormValueChange} />
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="finishedAt">Finished At</Label>
                                    <Input type="datetime-local" name="finishedAt" id="finishedAt" value={scanResult.finishedAt} onChange={handleFormValueChange} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <FormGroup>
                                    <Label for="findings">Findings</Label>
                                    <Input type="textarea" rows="10" name="findings" placeholder="Enter Findings JSON" value={scanResult.findings} onChange={handleFormValueChange}></Input>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>);
}

export default NewResult;
