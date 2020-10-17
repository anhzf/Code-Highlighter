<template>
    <q-layout view="lhh Lpr lFf">
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
            <code-highlighter
                class="code-highlighter row"
                :style="codeHighlighterStyles"
            />
            <section class="snippet-collections row">
                <div class="snippet-collections__header">
                    <h1
                        v-if="isAuth"
                        class="snippet-collections__header__title"
                    >
                        My Snippets
                    </h1>

                    <h1
                        v-else
                        class="snippet-collections__header__title"
                    >
                        Login to save your code snippets
                    </h1>
                </div>

                <section
                    v-if="isAuth"
                    class="snippet-collections__contents"
                >
                    <article
                        v-for="(snippet, index) in collections"
                        :key="index"
                        v-html="snippet.code"
                    />
                </section>
            </section>
        </q-page-container>

        <notification-messages />
    </q-layout>
</template>

<script>
import { mapState } from 'vuex';
import { LoadingBar } from 'quasar';
import CodeHighlighter from './components/CodeHighlighter';
import NotificationMessages from './components/notificationMessages';
import auth from './services/auth';
import { notify } from './utils';
import highlighterService from './services/highlighter';

export default {
    name: 'App',

    data() {
        return {
            overlay: false,
            codeHighlighterStyles: {},
        };
    },

    computed: {
        ...mapState('user', {
            isAuth: 'id',
            userName: 'name',
        }),

        collections() { return this.$store.state.highlighter.collections; },
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
                    notify(`Registered as ${res.name}`);
                } catch (err) {
                    notify(err);
                }
                LoadingBar.stop();
            });
        },

        async getSnippets() {
            LoadingBar.start();
            try {
                const snippets = await highlighterService.getSnippets();
                this.$store.commit('highlighter/addCollections', snippets);
            } catch (errs) {
                errs.forEach((err) => notify(err.message));
            }
            LoadingBar.stop();
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

    watch: {
        async isAuth() {
            await this.getSnippets();
        },
    },

    mounted() {
        // immediately logged in as user in localstorage
        if (auth.loggedInUser) this.$store.dispatch('user/authenticate', auth.loggedInUser);
    },

    components: {
        CodeHighlighter, NotificationMessages,
    },
};
</script>

<style lang="scss">
@import '~quasar/src/css/variables';

.code-highlighter {
    position: sticky;
    top: 0;
}

.snippet-collections {
    position: sticky;
    top: 0;
    background-color: #fff;
    display: flex;
    flex-direction: column;

    &__header {
        padding: 0 map-get($space-lg, x);
        background-color: $cyan;
        color: #fff;

        &__title {
            font-size: map-get($h2, size);
        }
    }

    &__contents {
        padding: map-get($space-lg, y) map-get($space-xl, x);
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: center;

        & .shiki {
            height: auto;
            max-height: 90vh;
        }
    }
}
</style>
