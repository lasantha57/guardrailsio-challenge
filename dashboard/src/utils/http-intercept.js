import fetchIntercept from 'fetch-intercept';

export const unregister = fetchIntercept.register({
    request: (request, config) => {

        config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }

        return [request, config];
    },
});
