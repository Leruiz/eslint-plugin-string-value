# eslint-plugin-string-value

check string value

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-attr`:

```
$ npm install eslint-plugin-string-value --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-attr` globally.

## Usage

Add `attr` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "string-value"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "string-value/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here





