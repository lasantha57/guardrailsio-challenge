import { get, put, post } from '../utils/http';
import resultType from '../utils/meta';

const mapResults = (results) => {
    results = results ? results.map((element) => {
        const result = {
            id: element.id,
            repository: element.repository,
            status: element.status,
            queuedAt: element.queuedAt,
            scanningAt: element.scanningAt,
            finishedAt: element.finishedAt,
            findingsCount: element.findings.length,
            findings: mapFindings(element.findings)
        }
        return result;
    }) : [];

    return results;
}

const mapFindings = (findings) => {
    findings = findings ? findings.map((element) => {
        const finding = {
            id: element.id,
            ruleId: element.ruleId,
            description: element.description,
            severity: element.severity,
            pathName: element.pathName,
            codeLine: element.codeLine
        }
        return finding;
    }) : [];

    return findings;
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
