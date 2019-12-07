import React, { Component } from 'react';
import { Container, Row, Col, Button, Table, Spinner } from 'reactstrap';

import { resultsService } from '../services/result-service';

class Findings extends Component {

    INITIAL_STATE = {
        findings: [],
        showLoadingSpinner: true
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

    componentDidMount = () => {
        const params = this.props.match.params;

        if (params) {

            let { findings, showLoadingSpinner } = this.state;

            resultsService.getFindingsById(params.id).then((response) => {
                showLoadingSpinner = false;
                if (response.statusCode === 200) {
                    findings = response.data;
                    this.setState({ findings, showLoadingSpinner });
                }
            }).catch((error) => {
                showLoadingSpinner = false;
                this.setState({ showLoadingSpinner });
            });
        }
    }

    renderTableContent = () => {
        const { findings, showLoadingSpinner } = this.state;

        if (showLoadingSpinner) {
            return (<tr className="text-center"><td colSpan={6}><Spinner color="primary" /></td></tr>);
        } else if (findings.length === 0) {
            return (<tr className="text-center"><td colSpan={6}>No Records Found !!</td></tr>);
        } else {
            return (
                findings && findings.map((value, index) => {
                    return <tr key={index}>
                        <td>{value.ruleId}</td>
                        <td>{value.description}</td>
                        <td>{value.severity}</td>
                        <td>{value.pathName}</td>
                        <td>{value.codeLine}</td>
                    </tr>
                })
            );
        }
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col sm={6}>
                        <label><h3>Findings</h3></label>
                    </Col>
                    <Col sm={6}>
                        <Button color="secondary float-right text-bold" onClick={() => this.back()}>Back</Button>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        <Table hover>
                            <thead>
                                <tr>
                                    <th>Rule Id</th>
                                    <th>Description</th>
                                    <th>Severity</th>
                                    <th>Path Name</th>
                                    <th>Code Line</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderTableContent()}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>);
    }
}

export default Findings;

