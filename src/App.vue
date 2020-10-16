<template>
    <q-layout view="lHh Lpr lFf">
        <q-header elevated>
            <q-toolbar>
                <q-toolbar-title>Code Highlighter</q-toolbar-title>

                <q-space />

                <template v-if="isAuth">
                    <q-btn
                        icon="person"
                        flat
                    >
                        {{ userName }}
                    </q-btn>

                    <q-separator
                        vertical
                        inset
                        spaced
                    />
                </template>

                <q-btn
                    v-if="!isAuth"
                    flat
                    @click="login"
                >
                    LOGIN
                </q-btn>
                <q-btn
                    v-if="!isAuth"
                    flat
                    @click="signUp"
                >
                    SIGN UP
                </q-btn>
                <q-btn
                    v-if="isAuth"
                    flat
                    @click="logout"
                >
                    LOGOUT
                </q-btn>
            </q-toolbar>
        </q-header>

        <q-page-container>
            <code-highlighter />
        </q-page-container>

        <notification-messages />
    </q-layout>
</template>

<script>
import { mapState } from 'vuex';
import { LoadingBar } from 'quasar';
import CodeHighlighter from './components/CodeHighlighter';
import NotificationMessages from './components/NotificationMessages';
import auth from './services/auth';

export default {
    name: 'App',

    data() {
        return {
            overlay: false,
        };
    },

    computed: {
        ...mapState('user', {
            isAuth: 'id',
            userName: 'name',
        }),
    },

    methods: {
        logout() {
            this.$store.dispatch('user/logout');
        },

        login() {
            this.prompt('Login').onOk((data) => {
                this.$store.dispatch('user/authenticate', data);
            });
        },

        signUp() {
            this.prompt('SignUp').onOk(async (data) => {
                LoadingBar.start();
                try {
                    const res = await auth.signUp(data);
                    this.$store.commit('pushNotificationMessage', `Registered as ${res.name}`);
                } catch (err) {
                    this.$store.commit('pushNotificationMessage', err);
                }
                LoadingBar.stop();
            });
        },

        prompt(title) {
            return this.$q.dialog({
                title,
                message: 'Enter your username',
                prompt: {
                    model: null,
                },
                cancel: true,
            }).onOk((data) => data);
        },
    },

    components: {
        CodeHighlighter, NotificationMessages,
    },
};
</script>

<style>
</style>
