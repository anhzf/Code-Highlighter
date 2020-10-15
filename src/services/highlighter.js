function compact(...val) {
    return val.reduce((acc, v) => (v ? [...acc, v] : [...acc]), []);
}

function resolveUrlPath(url, path) {
    const Url = new URL(url);

    const pathToJoin = path.split('/');
    const paths = compact(...[...Url.pathname.split('/'), ...pathToJoin]);

    Url.pathname = paths.join('/');

    return Url;
}

export default {
    API_URL: process.env.VUE_APP_API_URL,

    requestHeaders: {
        'Content-Type': 'application/json',
        Accept: 'application/json, text/html, text/plain, */*',
    },

    async getAvailableOptions() {
        return (await this.get('options')).data;
    },

    async highlightCode(config, code) {
        const res = await this.post('/', { code }, config);

        if (res.success) return res.data;

        throw res.data.details;
    },

    async login(name) {
        const res = await this.post('user/login', { name });

        if (res.success) return res.data;
        throw res.message;
    },

    async signUp(name) {
        const res = await this.post('user/register', { name });

        if (res.success) return res.data;
        throw res.message;
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
