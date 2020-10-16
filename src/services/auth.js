import { LocalStorage } from 'quasar';
import Api from './api';

const api = new Api({
    baseUrl: process.env.VUE_APP_API_URL,
});

export default {
    get loggedInUser() {
        return LocalStorage.getItem('loggedIn');
    },
    set loggedInUser(name) {
        return LocalStorage.set('loggedIn', name);
    },

    async login(name) {
        const res = await api.post('user/login', { name });

        if (res.success) {
            this.loggedInUser = res.data.name;
            return res.data;
        }
        this.loggedInUser = null;
        throw res.message;
    },

    async signUp(name) {
        const res = await api.post('user/register', { name });

        if (res.success) return res.data;
        throw res.message;
    },
};
