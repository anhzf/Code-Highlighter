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




    },
};
