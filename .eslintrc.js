module.exports = {
  extends: 'react-app',
  rules: {
    'accessor-pairs': 'error',
    'array-bracket-spacing': [
      'error',
      'never'
    ],
    'array-callback-return': 'error',
    'arrow-body-style': 'off',
    'arrow-parens': [
      'error',
      'as-needed'
    ],
    'arrow-spacing': [
      'error',
      {
        'after': true,
        'before': true
      }
    ],
    'block-scoped-var': 'error',
    'brace-style': 'off',
    'callback-return': 'error',
    'camelcase': 'off',
    'class-methods-use-this': 'off',
    'comma-dangle': [
      'error',
      'only-multiline'
    ],
    'comma-spacing': [
      'error',
      {
        'after': true,
        'before': false
      }
    ],
    'comma-style': [
      'error',
      'last'
    ],
    'computed-property-spacing': [
      'error',
      'never'
    ],
    'consistent-return': 'error',
    'consistent-this': 'off',
    'curly': 'error',
    'dot-notation': [
      'error',
      {
        'allowKeywords': true
      }
    ],
    'eol-last': 'error',
    'func-call-spacing': 'error',
    'func-names': [
      'error',
      'never'
    ],
    'func-style': [
      'warn',
      'declaration',
      {
        'allowArrowFunctions': true
      }
    ],
    'generator-star-spacing': 'error',
    'global-require': 'error',
    'guard-for-in': 'off',
    'handle-callback-err': 'error',
    'id-blacklist': 'error',
    'id-length': 'off',
    'id-match': 'error',
    'indent': 'off',
    'init-declarations': 'off',
    'jsx-quotes': 'error',
    'key-spacing': 'error',
    'keyword-spacing': [
      'error',
      {
        'after': true,
        'before': true
      }
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'lines-around-comment': [
      'warn', {
        'beforeBlockComment': true,
        'allowBlockStart': true,
        'allowObjectStart': true,
        'allowArrayStart': true
      }
    ],
    'max-depth': 'error',
    'max-len': [
      'warn', 80,
      {
        'ignoreComments': true
      }
    ],
    'max-lines': [
      'warn',
      {
        'max': 5000,
        'skipBlankLines': true
      }
    ],
    'max-nested-callbacks': 'error',
    'max-params': 'off',
    'max-statements': 'off',
    'max-statements-per-line': [
      'warn', {
        'max': 2
      }
    ],
    'multiline-ternary': 'off',
    'newline-after-var': 'off',
    'newline-before-return': 'off',
    'no-alert': 'error',
    'no-bitwise': 'error',
    'no-catch-shadow': 'error',
    'no-continue': 'error',
    'no-console': 'warn',
    'no-div-regex': 'error',
    'no-duplicate-imports': 'error',
    'no-else-return': 'warn',
    'no-empty-function': 'off',
    'no-eq-null': 'error',
    'no-eval': 'error',
    'no-extra-parens': 'off',
    'no-floating-decimal': 'error',
    'no-global-assign': 'error',
    'no-implicit-coercion': [
      'error',
      {
        'allow': ['+', '!!', '*']
      }
    ],
    'no-implicit-globals': 'error',
    'no-implied-eval': 'error',
    'no-inline-comments': 'off',
    'no-label-var': 'error',
    'no-labels': 'error',
    'no-lonely-if': 'error',
    'no-magic-numbers': 'off',
    'no-mixed-requires': 'error',
    'no-multi-spaces': 'off',
    'no-multiple-empty-lines': 'error',
    'no-negated-condition': 'warn',
    'no-nested-ternary': 'off',
    'no-new': 'error',
    'no-new-func': 'error',
    'no-new-object': 'error',
    'no-new-require': 'error',
    'no-new-wrappers': 'error',
    'no-octal-escape': 'error',
    'no-param-reassign': 'off',
    'no-path-concat': 'error',
    'no-plusplus': 'off',
    'no-proto': 'error',
    'no-prototype-builtins': 'off',
    'no-restricted-globals': 'error',
    'no-restricted-imports': 'error',
    'no-restricted-modules': 'error',
    'no-return-assign': 'off',
    'no-shadow': 'warn',
    'no-spaced-func': 'error',
    'no-sync': 'error',
    'no-tabs': 'error',
    'no-template-curly-in-string': 'error',
    'no-ternary': 'off',
    'no-throw-literal': 'error',
    'no-trailing-spaces': 'error',
    'no-undef-init': 'error',
    'no-undefined': 'off',
    'no-unmodified-loop-condition': 'error',
    'no-unneeded-ternary': 'error',
    'no-unsafe-negation': 'error',
    'no-useless-call': 'error',
    'no-void': 'error',
    'object-curly-newline': 'off',
    'object-curly-spacing': [
      'error',
      'never'
    ],
    'object-property-newline': [
      'error',
      {
        'allowMultiplePropertiesPerLine': true
      }
    ],
    'object-shorthand': 'off',
    'one-var': 'off',
    'one-var-declaration-per-line': 'error',
    'operator-linebreak': [
      'error',
      'after'
    ],
    'padded-blocks': 'off',
    'prefer-arrow-callback': 'off',
    'prefer-const': 'off',
    'prefer-reflect': 'off',
    'prefer-rest-params': 'warn',
    'prefer-spread': 'warn',
    'prefer-template': 'off',
    'quote-props': 'off',
    'quotes': 'off',
    'require-jsdoc': 'off',
    'semi': 'error',
    'semi-spacing': 'error',
    'sort-imports': 'off',
    'sort-keys': 'off',
    'space-before-blocks': 'off',
    'space-before-function-paren': 'off',
    'space-in-parens': [
      'error',
      'never'
    ],
    'space-infix-ops': 'error',
    'space-unary-ops': 'error',
    'spaced-comment': [
      'warn',
      'always'
    ],
    'symbol-description': 'error',
    'template-curly-spacing': 'error',
    'valid-jsdoc': [
      'warn',
      {
        'requireReturnType': false,
        'requireReturn': false,
        'requireParamDescription': false,
        'requireReturnDescription': false
      }
    ],
    'wrap-iife': ['error', 'inside'],
    'wrap-regex': 'error',
    'yield-star-spacing': 'error',
    'yoda': [
      'warn',
      'never'
    ],
    'react/prop-types': ['warn',
      {
        'ignore': ['children', 'location', 'params']
      }
    ],
    'react/prefer-es6-class': 'warn',
    'react/jsx-wrap-multilines': 'warn',
    'react/jsx-indent': ['warn', 2],
    'react/jsx-key': 'warn',
    'react/jsx-no-bind': [
      'warn',
      {
        'ignoreRefs': true,
        'allowArrowFunctions': true
      }
    ],
    'react/jsx-max-props-per-line': [
      'warn',
      {
        'maximum': 2,
        'when': 'multiline'
      }
    ]
  }
};

// vim: set ts=2 sw=2 tw=80: