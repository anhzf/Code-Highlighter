import Api from './api';

const api = new Api({
    baseUrl: process.env.VUE_APP_API_URL,
});

export default {
    async getAvailableOptions() {
        return (await api.get('options')).data;
    },

    async highlightCode(config, code) {
        const res = await api.post('/', { code }, config);

        if (res.success) return res.data;

        throw res.data.details;
    },

    async getPNG(config, code) {
        api.method = 'POST';

        const options = { ...config, download: 1 };
        const res = await api.request('/', { code }, options);

        if (res.body instanceof ReadableStream) return res;

        throw (await res.json()).data.details;
    },
};
