import fetchIntercept from 'fetch-intercept';

export const unregister = fetchIntercept.register({
    request: (request, config) => {

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        config = {
            headers: headers
        }

        return [request, config];
    },

    requestError: (error) => {
        // Called when an error occured during another 'request' interceptor call
        return Promise.reject(error);
    },

    response: (response) => {
        // Modify the reponse object
        return response;
    },

    responseError: (error) => {
        // Handle an fetch error
        return Promise.reject(error);
    }
});
