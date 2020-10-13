<template>
    <q-layout view="lHh Lpr lFf">
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
    </q-layout>
</template>

<script>
import CodeHighlighter from './components/CodeHighlighter';

export default {
    name: 'App',

    components: {
        CodeHighlighter,
    },
};
</script>

<style>
</style>
