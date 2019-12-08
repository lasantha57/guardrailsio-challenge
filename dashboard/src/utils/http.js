import { BASE_API } from './configs';

//https://www.carlrippon.com/fetch-with-async-await-and-typescript/

const http = (request) => {
    return new Promise((resolve, reject) => {
        let response;
        fetch(request)
            .then(res => {
                response = res;
                return res.json();
            })
            .then(body => {
                if (response.ok) {
                    resolve({
                        statusCode: response.status,
                        data: body,
                        error: null
                    });
                } else {
                    reject(
                        {
                            statusCode: body.statusCode,
                            message: body.message,
                            error: body.error
                        }
                    );
                }
            })
            .catch(err => {
                let errorResponse = {
                    statusCode: null,
                    message: '',
                    error: err
                }

                if (!response) {
                    errorResponse.message = 'Connection error. Try again.';
                    reject(errorResponse);
                    return;
                }

                errorResponse.statusCode = response.status ? response.status : '';

                if (response.status) {
                    if (response.status === 500) {
                        errorResponse.message = 'Something went wrong. Try again.';
                    } else {
                        errorResponse.message = 'Unknown error occured!';
                    }
                }
                reject(errorResponse);
            });
    });
};

export const get = async (path, args = { method: 'get' }) => {
    return await http(new Request(`${BASE_API}/${path}`, args));
};

export const post = async (path, body, args = { method: 'post', body: JSON.stringify(body) }) => {
    return await http(new Request(`${BASE_API}/${path}`, args));
};

export const put = async (path, body, args = { method: 'put', body: JSON.stringify(body) }) => {
    return await http(new Request(`${BASE_API}/${path}`, args));
};

export const remove = async (path, args = { method: 'delete' }) => {
    return await http(new Request(`${BASE_API}/${path}`, args));
};
