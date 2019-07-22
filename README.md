# eslint-plugin-string-value

check string value

+ js
+ vue

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

1.  ### string-value/blacklist

    This rule prevents to use literal string values matched given regular expressions, unless they are ignored explicitly.

    #### Options
    ```js
        {
            patterns: [],
            ignoredValues: [],
        }
    ```
    - `patterns` (`regexp[]`) : Array of regular expressions provides string patterns in blacklist. Empty array is no meaningful.

    - `ignoredValues` (`string[]`) : Array of strings to be ignored. Default is empty.

2. ### string-value/attributes-value-blacklist

    This rule works for **vue template** file, to prevent to use string values in black list in designated tags and attributes.

    #### Options
    - Different black lists can be applied in diffrent tags and attributes. It can be considered as a group of *blacklist* rules.
        ```js
        {
            blacklist: [
                {
                    tagName: "",
                    attributeName: "",
                    patterns: [],
                    ignoredValues: [],
                }
            ]
        }
        ```
        - `blacklist` (`array`): Array of objects provides detailed options of blacklist rules. In each rule,

            - `patterns` and `ignoredValues` are the same as above usage.
            - `tagName` (`string`) and  `attributeName` (`string`): A string provides target tag and attribute of this blacklist rule, 
                
               +  *`tagName(attributeName) = *` matches all tags(attributes)*
        
        ----
        *example*: 
        ```js
        {
            blacklist: [
                {
                    tagName: "img",
                    attributeName: "src",
                    patterns: [/a.com/],
                    ignoredValues: [],
                }
            ]
        }
        ```

        With such options, below code has error:
        ```js
            <img src="http://a.com/halo.png">
        ```
        







