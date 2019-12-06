import React, { Component } from 'react';
import { Container, Row, Col, Button, Table, Spinner, Badge } from 'reactstrap';

import { resultsService } from '../services/result-service';

class Results extends Component {

    INITIAL_STATE = {
        results: [],
        showLoadingSpinner: true
    }

    constructor(props) {
        super(props);
        this.state = {
            ...this.INITIAL_STATE
        }
    }

    createNew = () => {
        this.props.history.push('/results/new');
    }

    showFindings = (id) => {
        this.props.history.push(`/results/findings/${id}`);
    }

    componentDidMount = () => {
        let { results, showLoadingSpinner } = this.state;

        resultsService.getAll().then((response) => {
            showLoadingSpinner = false;
            if (response.statusCode === 200) {
                results = response.data;
                this.setState({ results, showLoadingSpinner });
            }
        }).catch((error) => {
            showLoadingSpinner = false;
            this.setState({ showLoadingSpinner });
        });
    }

    renderTableContent = () => {
        const { results, showLoadingSpinner } = this.state;

        if (showLoadingSpinner) {
            return (<tr className="text-center"><td colSpan={6}><Spinner color="primary" /></td></tr>);
        } else if (results.length === 0) {
            return (<tr className="text-center"><td colSpan={6}>No Records Found !!</td></tr>);
        } else {
            return (
                results && results.map((value) => {
                    return <tr key={value.id} onClick={() => this.showFindings(value.id)}>
                        <td className="py-1">{value.repository}</td>
                        <td className="py-1">{value.status}</td>
                        <td className="py-1">{value.queuedAt}</td>
                        <td className="py-1">{value.scanningAt}</td>
                        <td className="py-1">{value.finishedAt}</td>
                        <td className="py-1"><Badge color="success">{value.findingsCount}</Badge></td>
                    </tr>
                })
            );
        }
    }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col sm={6}>
                        <label><h3>Scan Results</h3></label>
                    </Col>
                    <Col sm={6}>
                        <Button color="success float-right text-bold" onClick={() => this.createNew()}><i className="fas fa-plus"></i>  Add New Scan Result</Button>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        <Table hover>
                            <thead>
                                <tr>
                                    <th>Repository Name</th>
                                    <th>Status</th>
                                    <th>Queued At</th>
                                    <th>Scanning At</th>
                                    <th>Finished At</th>
                                    <th>Findings</th>
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

export default Results;
