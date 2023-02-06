module.exports = {
    root: true,
    extends: ['@react-native-community', 'airbnb-typescript', 'prettier', 'prettier/@typescript-eslint', 'prettier/react'],
    rules: {
        'prettier/prettier': 'error',
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": ["error"],
        "react/no-children-prop": "off",
        'react/jsx-filename-extension': [
            'error',
            { extensions: ['.js', '.jsx', '.tsx'] },
        ],
        'require-jsdoc': 0,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
};
