module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: [ 'eslint:recommended', 'plugin:vue/vue3-essential', 'plugin:@typescript-eslint/recommended' ],
    overrides: [],
    parser: 'vue-eslint-parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        parser: '@typescript-eslint/parser'
    },
    plugins: [ 'vue', '@typescript-eslint' ],
    rules: {
    // 不禁用 debugger
        'no-debugger': 0,
        // 强制把变量的使用限制在其定义的作用域范围内
        'block-scoped-var': 'error',
        // 默认情况下当 if、else、for、while 或 do 不使用大括号包裹代码时，会给出警告。然而，你可以指定当块中有多条语句时才使用大括号，而当代码块中只有一条语句时只会给出警告。
        curly: [ 'error', 'multi' ],
        // 强制在点号之前或之后换行
        'dot-location': [ 'error', 'property' ],
        // 要求使用 === 和 !==
        eqeqeq: [ 'error', 'always' ],
        // 禁用 caller 或 callee
        'no-caller': 'error',
        // 禁止出现空函数
        'no-empty-function': 'error',
        // 禁止与 null 进行比较 ,该规则旨在通过确保与 null 比较时只等于 null，而不同时等于 undefined， 来减少潜在的 bug 和 意外行为。因此，它也将标记使用 == 和 != 与 null比较的情况。
        'no-eq-null': 'error',
        // 禁用 eval()
        'no-eval': 'error',
        // 禁止扩展原生对象
        'no-extend-native': 'error',
        // 禁止不必要的函数绑定
        'no-extra-bind': 'error',
        // 禁用不必要的标签
        'no-extra-label': 'error',
        // 禁止浮点小数
        'no-floating-decimal': 'error',
        // 禁止 this 关键字在类或类对象之外出现
        'no-invalid-this': 'error',
        // 禁用标签语句
        'no-labels': 'error',
        // 禁用不必要的嵌套块
        'no-lone-blocks': 'error',
        // 禁止出现多个空格
        'no-multi-spaces': 'error',
        // 禁止多行字符串
        'no-multi-str': 'error',
        // 禁用不必要的 return await
        'no-return-await': 'error',
        // 不允许使用逗号操作符
        'no-sequences': 'error',
        // 禁止多余的 return 语句
        'no-useless-return': 'error',
        // 强制在括号内使用空格
        'array-bracket-spacing': [ 'error', 'always' ],
        // 强制数组元素间出现换行
        'array-element-newline': [ 'error', 'consistent' ],
        // 禁止或强制在代码块中开括号前和闭括号后有空格
        'block-spacing': 'error',
        // 大括号风格要求
        'brace-style': 'error',
        // 要求使用骆驼拼写法
        camelcase: 'error',
        // 要求或禁止使用拖尾逗号
        'comma-dangle': [ 'error', 'never' ],
        // 禁止或强制在计算属性中使用空格
        'computed-property-spacing': [ 'error', 'never' ],
        // 要求或禁止文件末尾保留一行空行
        'eol-last': [ 'error', 'always' ],
        // 要求或禁止在函数标识符和其调用之间有空格
        'func-call-spacing': [ 'error', 'never' ],
        // 强制在函数括号内使用一致的换行
        'function-paren-newline': [ 'error', 'multiline' ],
        // 强制隐式返回的箭头函数体的位置
        'implicit-arrow-linebreak': [ 'error', 'beside' ],
        // 强制使用一致的缩进
        indent: [ 'error', 4, { SwitchCase: 1 } ],
        // 强制在 JSX 属性中使用一致的单引号或双引号
        'jsx-quotes': [ 'error', 'prefer-double' ],
        // 强制在对象字面量的键和值之间使用一致的空格
        'key-spacing': [ 'error', { beforeColon: false } ],
        // 强制关键字周围空格的一致性
        'keyword-spacing': [ 'error', { before: true } ],
        // 强制行注释的位置
        'line-comment-position': [ 'error', { position: 'above' } ],
        // 要求或禁止在类成员之间出现空行
        'lines-between-class-members': [ 'error', 'always' ],
        // 要求或禁止在三元操作数中间换行
        'multiline-ternary': [ 'error', 'always-multiline' ],
        // 禁止使用内联注释
        'no-inline-comments': 'error',
        // 禁止 if 语句作为唯一语句出现在 else 语句块中
        'no-lonely-if': 'error',
        // 禁止连续赋值
        'no-multi-assign': 'error',
        // 不允许多个空行
        'no-multiple-empty-lines': 'error',
        // 强制单个语句的位置
        'nonblock-statement-body-position': [ 'error', 'beside' ],
        // 强制在花括号内使用一致的换行符
        'object-curly-newline': [ 'error', { multiline: true } ],
        // 强制在花括号中使用一致的空格
        'object-curly-spacing': [ 'error', 'always' ],
        // 强制操作符使用一致的换行符风格
        'operator-linebreak': [ 'error', 'none' ],
        // 要求或禁止块内填充
        'padded-blocks': [ 'error', 'never' ],
        // 要求对象字面量属性名称使用引号
        'quote-props': [ 'error', 'as-needed' ],
        // 强制使用一致的反勾号、双引号或单引号
        quotes: [ 'error', 'single' ],
        // 要求或禁止使用分号代替 ASI
        semi: [ 'error', 'never' ],
        // 要求或禁止语句块之前的空格
        'space-before-blocks': 'error',
        // 要求或禁止函数圆括号之前有一个空格
        'space-before-function-paren': [ 'error', 'never' ],
        // 禁止或强制圆括号内的空格
        'space-in-parens': [ 'error', 'never' ],
        // 要求中缀操作符周围有空格
        'space-infix-ops': 'error',
        // 要求或禁止在一元操作符之前或之后存在空格
        'space-unary-ops': 'error',
        // 要求或禁止在注释前有空白
        'spaced-comment': [ 'error', 'always' ],
        // 强制在 switch 的冒号左右有空格
        'switch-colon-spacing': 'error',
        'vue/attributes-order': 'off',
        'vue/one-component-per-file': 'off',
        'vue/html-closing-bracket-newline': 'off',
        'vue/max-attributes-per-line': 'off',
        'vue/multiline-html-element-content-newline': 'off',
        'vue/singleline-html-element-content-newline': 'off',
        'vue/attribute-hyphenation': 'off',
        'vue/require-default-prop': 'off',
        'vue/multi-word-component-names': 0,
        'vue/valid-template-root': 'off',
        'vue/no-setup-props-destructure': 'off',
        'vue/html-indent': 'off',
        'vue/no-v-html': 'off',
        'vue/no-multiple-template-root': 'off',
        'vue/script-setup-uses-vars': 'error',
        'vue/custom-event-name-casing': 'off',
        'no-undef': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-unused-vars': [ 'error',
            {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_'
            } ],
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-empty-interface': 'off'
    }
}
