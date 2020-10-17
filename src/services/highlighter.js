import store from '@/store';
import { compact } from '@/utils';
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

    async storeCode(config, code) {
        const body = {
            user: store.state.user.id,
            content: {
                code,
                ...compact(config),
            },
        };
        const res = await api.post('code/store', body);

        if (res.success) return res.data;

        throw res.data.details;
    },

    async getSnippets(config = {}) {
        const user = store.state.user.id;
        const queries = {
            sortBy: null,
            sort: null,
            page: null,
            limit: 10,
            ...config,
        };
        const res = await api.post('code/list', { user }, compact(queries));

        if (res.success) return res.data;

        throw res.data.details;
    },

    async deleteSnippet(id) {
        const body = {
            id,
            user: store.state.user.id,
        };

        const res = await api.post('code/delete', body);

        if (res.success) return true;

        throw res.message;
    },
};
