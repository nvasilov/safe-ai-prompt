// TODO temp config just to work with IDE inspect

// eslint-disable-next-line no-undef
module.exports = {

    plugins: [
        'security',
        'no-unsanitized',
        "react",
        "react-hooks"
    ],

    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:jsx-a11y/recommended",

        "plugin:react/recommended",
        "plugin:react-hooks/recommended",

        "plugin:security/recommended-legacy",
        "plugin:no-unsanitized/recommended-legacy"
    ],

    rules: {
        // not need for React 17+
        'react/react-in-jsx-scope': "off",

        // allows the use of 'any' when absolutely necessary
        // overuse of 'any' weakens type safety and can hide potential type errors.
        '@typescript-eslint/no-explicit-any': 'warn',

        // warns about variables that are declared but not used.
        // unused variables might indicate bugs or leftover code, cluttering the codebase.
        // ignores variables prefixed with '_' to allow intentional placeholders.
        '@typescript-eslint/no-unused-vars': ['warn', {argsIgnorePattern: '^_', varsIgnorePattern: '^_'}],

        // ensures that dependencies for React hooks like useEffect are complete
        // omitting required dependencies in hooks can cause stale closures or inconsistent behavior.
        'react-hooks/exhaustive-deps': 'warn',

        // enforces the use of strict equality (===) to avoid type coercion issues.
        // loose equality (==) might lead to unexpected behavior due to implicit type conversion.
        'eqeqeq': ['warn', 'always'],

        // warns when using console methods, except for warn and error.
        // using console.log in production can leak sensitive information or clutter the output.
        'no-console': ["warn", {"allow": ["warn", "error"]}],

        // warns against the presence of debugger statements.
        // debugger statements can halt code execution and may inadvertently expose internal application state.
        'no-debugger': 'warn',

        // warns about the use of eval(), which executes code represented as a string.
        // eval() can lead to code injection vulnerabilities and unintended execution of arbitrary code.
        'no-eval': 'warn',

        // throws an error when eval() is used with expressions.
        // this usage can lead to dynamic code execution paths that are difficult to secure.
        'security/detect-eval-with-expression': 'warn',

        // warns when dynamic object keys are used, as they can allow object injection.
        // unvalidated keys can lead to prototype pollution, modifying the behavior of all objects.
        'security/detect-object-injection': 'warn',

        // warns when function parameters are reassigned.
        // mutating function parameters can lead to side effects and unpredictable behavior,
        // especially when the parameter is a shared object. 'state' is ignored here to allow safe mutations in Redux Toolkit (via Immer).
        'no-param-reassign': ['warn', {props: true, ignorePropertyModificationsFor: ['state']}]
    }
}
