import { get, put, post } from '../utils/http';
import { statusTypes } from '../utils/meta';

const mapResults = (results) => {

    results = results ? results.map((element) => {

        const result = {
            id: element._id,
            repositoryName: element.repositoryName,
            statusId: element.statusId,
            status: statusTypes[element.statusId - 1].name,
            queuedAt: formatDateTime(element.queuedAt),
            scanningAt: formatDateTime(element.scanningAt),
            finishedAt: formatDateTime(element.finishedAt),
            findingsCount: element.findings && element.findings.findings ? element.findings.findings.length : 0
        }
        return result;
    }) : [];

    return results;
}

const formatDateTime = (date = '') => {
    return new Date(date).toLocaleString()
}

const mapFindings = (data) => {
    return data.findings && data.findings.findings ? data.findings.findings.map((element) => {
        const finding = {
            ruleId: element.ruleId || '',
            description: ((element || '').metadata || '').description,
            severity: ((element || '').metadata || '').severity,
            pathName: ((element || '').location || '').path,
            codeLine: ((((element || '').location || '').positions || '').begin || '').line
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

const getFindingsById = (id) => {
    return new Promise((resolve, reject) => {
        get(`results/${id}/findings`).then((results) => {
            results.data = mapFindings(results.data);
            resolve(results)
        }).catch((error) => {
            reject(error);
        })
    });
}

const saveOrUpdate = (result) => {

    if (result.findings) {
        result.findings = JSON.parse(result.findings);
    }

    if (result.id) {
        return put(`results/${result.id}`, result)
    } else {
        return post(`results`, result)
    }
}

export const resultsService = {
    getAll,
    getById,
    saveOrUpdate,
    getFindingsById
};
