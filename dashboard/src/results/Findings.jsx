import React, { useState, useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { Container, Row, Col, Button, Table, Spinner } from 'reactstrap';

import { resultsService } from '../services/result-service';

const Findings = () => {

    const [showLoadingSpinner, setLoadingSpinner] = useState(true);
    const [findings, setFindings] = useState([]);
    const match = useRouteMatch();
    const history = useHistory();

    useEffect(() => {
        const fetchFindings = async () => {
            try {
                const response = await resultsService.getFindingsById(match.params.id);
                setLoadingSpinner(false);
                setFindings(response.data);
            } catch (error) {
                setLoadingSpinner(false);
            }
        }
        fetchFindings();
    }, []);

    const back = () => {
        history.push('/results');
    }

    const renderTableContent = () => {
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

    return (
        <Container>
            <Row>
                <Col sm={6}>
                    <label><h3>Findings</h3></label>
                </Col>
                <Col sm={6}>
                    <Button color="secondary float-right text-bold" onClick={back}>Back</Button>
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
                            {renderTableContent()}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>);
}

export default Findings;

