import { compact } from '@/utils';

function resolveUrlPath(url, path) {
    const Url = new URL(url);

    const pathToJoin = path.split('/');
    const paths = compact([...Url.pathname.split('/'), ...pathToJoin]);

    Url.pathname = paths.join('/');

    return Url;
}

function buildQuery(url, params) {
    const built = new URL(url);

    Object.entries(params).forEach(([key, value]) => {
        // remove all falsy element
        if (value) built.searchParams.set(key, value);
    });

    return built;
}

export default class Api {
    baseUrl = '';

    requestHeaders = {
        'Content-Type': 'application/json',
        Accept: 'application/json, text/html, text/plain, */*',
    };

    constructor(ops = {}) {
        this.baseUrl = ops.baseUrl;
        this.requestHeaders = { ...this.requestHeaders, ...ops.requestHeaders };
    }

    async get(path = '', params = {}) {
        this.method = 'GET';
        return this.requestJson(path, null, params);
    }

    async post(path = '', body = {}, params = {}) {
        this.method = 'POST';
        return this.requestJson(path, body, params);
    }

    async request(path = '', body = {}, params = {}, headers = {}) {
        const config = this.__setupRequestConfig(headers, body);
        const url = buildQuery(resolveUrlPath(this.baseUrl, path), params);

        const res = await fetch(url.toString(), config);

        return res;
    }

    async requestJson(path = '', body = {}, params = {}, headers = {}) {
        const res = await this.request(path, body, params, headers);

        return res.json();
    }

    __setupRequestConfig(headers, body) {
        // will return object if true
        const bodies = (this.method.toUpperCase() !== 'GET') && {
            body: JSON.stringify(body),
        };

        return {
            method: this.method.toUpperCase(),
            headers: {
                ...this.requestHeaders,
                ...headers,
            },
            // conditionally add object property
            ...bodies,
        };
    }
}
