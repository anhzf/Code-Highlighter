module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        'plugin:vue/strongly-recommended',
        '@vue/airbnb',
    ],
    parserOptions: {
        parser: 'babel-eslint',
    },
    rules: {
        // Vue eslint plugin
        'vue/html-indent': ['error', 4, {
            attribute: 1,
            baseIndent: 1,
            closeBracket: 0,
            alignAttributesVertically: true,
            ignores: [],
        }],
        'vue/script-indent': ['error', 4, {
            baseIndent: 0,
            switchCase: 0,
            ignores: [],
        }],


        // Eslint Rule
        'func-names': 'off',
        'indent': ['error', 4],
        'import/extensions': 'off',
        'import/prefer-default-export': 'off',
        'max-len': ['error', {
            code: 150,
            comments: 200,
        }],
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-multi-assign': 'off',
        'no-underscore-dangle': 'off',
    },
};
