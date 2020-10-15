import Api from './api';

const api = new Api({
    baseUrl: process.env.VUE_APP_API_URL,
});

export default {
    async login(name) {
        const res = await api.post('user/login', { name });

        if (res.success) return res.data;
        throw res.message;
    },

    async signUp(name) {
        const res = await api.post('user/register', { name });

        if (res.success) return res.data;
        throw res.message;
    },
};
