import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Container, Row, Col, Button, Table, Spinner, Badge } from 'reactstrap';

import { resultsService } from '../services/result-service';

const Results = () => {

    const [results, setResults] = useState([]);
    const [showLoadingSpinner, setShowLoadingSpinner] = useState(true);
    const history = useHistory();

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await resultsService.getAll();
                setShowLoadingSpinner(false);
                if (response.statusCode === 200) {
                    setResults(response.data);
                }
            } catch (error) {
                setShowLoadingSpinner(false);
            }
        }
        fetchResults();
    }, []);

    const createNew = () => {
        history.push('/results/new');
    }

    const showFindings = (id) => {
        history.push(`/results/findings/${id}`);
    }

    const renderTableContent = () => {
        if (showLoadingSpinner) {
            return (<tr className="text-center"><td colSpan={6}><Spinner color="primary" /></td></tr>);
        } else if (results.length === 0) {
            return (<tr className="text-center"><td colSpan={6}>No Records Found !!</td></tr>);
        } else {
            return (
                results && results.map((value) => {
                    return <tr style={{ cursor: 'pointer' }} key={value.id} onClick={() => showFindings(value.id)}>
                        <td>{value.repositoryName}</td>
                        <td>{value.status}</td>
                        <td>{value.queuedAt}</td>
                        <td>{value.scanningAt}</td>
                        <td>{value.finishedAt}</td>
                        <td className="text-center"><Badge color="success">{value.findingsCount}</Badge></td>
                    </tr>
                })
            );
        }
    }

    return (
        <Container>
            <Row>
                <Col sm={6}>
                    <label><h3>Scan Results</h3></label>
                </Col>
                <Col sm={6}>
                    <Button color="success float-right text-bold" onClick={createNew}><i className="fas fa-plus"></i>  Add New Scan Result</Button>
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
                            {renderTableContent()}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>);
}

export default Results;
