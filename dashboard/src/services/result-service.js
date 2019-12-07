import { get, put, post } from '../utils/http';
import { statusTypes } from '../utils/meta';

const mapResults = (results) => {

    results = results ? results.map((element) => {

        element.findings = mapFindings(element.findings);

        const result = {
            id: element._id,
            repositoryName: element.repositoryName,
            statusId: element.statusId,
            status: statusTypes[element.statusId - 1].name,
            queuedAt: formatDateTime(element.queuedAt),
            scanningAt: formatDateTime(element.scanningAt),
            finishedAt: formatDateTime(element.finishedAt),
            findingsCount: element.findings.length,
            findings: element.findings
        }
        return result;
    }) : [];

    return results;
}

const formatDateTime = (date = '') => {
    return new Date(date).toLocaleString()
}

const mapFindings = (findings) => {
    return findings && findings.findings ? findings.findings.map((element) => {
        const finding = {
            id: element._id,
            ruleId: element.ruleId,
            description: element.description,
            severity: element.severity,
            pathName: element.pathName,
            codeLine: element.codeLine
        }
        return finding;
    }) : [];
}

const getAll = () => {
    return new Promise((resolve, reject) => {
        get(`results`).then((results) => {
            results.data = mapResults(results.data);
            resolve(results)
        }).catch((error) => {
            reject(error);
        })
    });
}

const getById = (id) => {
    return get(`results/${id}`);
}

const saveOrUpdate = (result) => {
    if (result.id) {
        return put(`results/${result.id}`, result)
    } else {
        return post(`results`, result)
    }
}

export const resultsService = {
    getAll,
    getById,
    saveOrUpdate
};
