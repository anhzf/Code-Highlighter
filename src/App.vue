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
                    <h1 class="snippet-collections__header__title">
                        {{ isAuth ? 'My Snippets' : 'Login to save your code snippets' }}
                    </h1>
                </div>

                <section
                    v-if="isAuth"
                    class="snippet-collections__contents"
                >
                    <article
                        v-for="snippet in collections"
                        :key="snippet.id"
                    >
                        <q-bar>
                            <q-space />
                            <q-btn
                                icon="edit"
                                color="green-14"
                                dense
                                flat
                            >
                                <q-tooltip>Edit snippet</q-tooltip>
                            </q-btn>
                            <q-btn
                                icon="delete"
                                color="red"
                                dense
                                flat
                                @click="deleteSnippet(snippet.id)"
                            >
                                <q-tooltip>Delete snippet</q-tooltip>
                            </q-btn>
                        </q-bar>
                        <div v-html="snippet.code" />
                    </article>

                    <q-inner-loading :showing="snippetsLoading">
                        <q-spinner
                            size="80px"
                            color="primary"
                        />
                    </q-inner-loading>
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

            snippetsLoading: false,
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
            this.snippetsLoading = true;
            try {
                const snippets = await highlighterService.getSnippets();
                this.$store.commit('highlighter/addCollections', snippets);
            } catch (errs) {
                errs.forEach((err) => notify(err.message));
            }
            this.snippetsLoading = false;
        },

        deleteSnippet(id) {
            this.$q.dialog({
                title: 'Are you sure to delete this snippet?',
                cancel: true,
            }).onOk(async () => {
                LoadingBar.start();
                try {
                    await highlighterService.deleteSnippet(id);
                    notify('Snippet removed!');
                    this.$store.commit('highlighter/resetCollections');
                    LoadingBar.stop();
                    await this.getSnippets();
                } catch (err) {
                    notify(err);
                    LoadingBar.stop();
                }
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
            });
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
        position: relative;
        padding: map-get($space-lg, y) map-get($space-xl, x);
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: center;

        & .q-inner-loading {
            position: sticky;
            top: 0;
            height: 100vh;
            width: 100%;
        }

        & .q-bar {
            background-color: #0f141f;
            border-radius: .5rem .5rem 0 0;
        }

        & .shiki {
            height: auto;
            margin-top: 0;
            max-height: 90vh;
            border-radius: 0 0 .5rem .5rem;
        }
    }
}
</style>
