import { resolveUrlPath } from 'src/utils';

export default {
    API_URL: process.env.API_URL,

    requestHeaders: {
        'Content-Type': 'application/json',
        Accept: 'application/json, text/html, text/plain, */*',
    },

    async get(path = '', params = {}) {
        this.method = 'GET';
        return this.__request(path, null, params);
    },

    async post(path = '', body = {}, params = {}) {
        this.method = 'POST';
        return this.__request(path, body, params);
    },

    async __request(path = '', body = {}, params = {}, headers = {}) {
        const config = this.__setupRequestConfig(headers, body);
        const url = this.__buildQuery(resolveUrlPath(this.API_URL, path), params);

        const res = await fetch(url.toString(), config);

        return res.json();
    },

    __setupRequestConfig(headers, body) {
        // will return object if true
        body = (this.method.toUpperCase() !== 'GET') && {
            body: JSON.stringify(body),
        };

        return {
            method: this.method.toUpperCase(),
            headers: {
                ...this.requestHeaders,
                ...headers,
            },
            // conditionally add object property
            ...body,
        };
    },

    __buildQuery(url, params) {
        const built = new URL(url);

        Object.entries(params).forEach(([key, value]) => {
            // remove all falsy element
            if (value) {
                built.searchParams.set(key, value);
            }
        });

        return built;
    },
};
