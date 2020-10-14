<template>
    <q-layout view="lHh Lpr lFf">
        <c-overlay v-if="overlay" />
        <q-header elevated>
            <q-toolbar>
                <q-toolbar-title>
                    Code Highlighter
                </q-toolbar-title>
            </q-toolbar>
        </q-header>

        <q-page-container>
            <code-highlighter />
        </q-page-container>

        <notification-messages />
    </q-layout>
</template>

<script>
import CodeHighlighter from './components/CodeHighlighter';
import NotificationMessages from './components/NotificationMessages';

export default {
    name: 'App',

    components: {
        CodeHighlighter, NotificationMessages,
    },
};
</script>

<style>
</style>
