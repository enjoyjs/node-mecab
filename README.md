# node-mecab

MeCab wrapper for Node.js

## 前提条件

MeCabがインストールされている必要があります。

- [MeCab: Yet Another Part-of-Speech and Morphological Analyzer](https://taku910.github.io/mecab/)
- [taku910/mecab: Yet another Japanese morphological analyzer](https://github.com/taku910/mecab)

## インストール

```bash
npm i @enjoyjs/node-mecab
```

## API

### analyze(text: string, options?: [MecabOptions](src/types.ts#L10-L36)): Promise\<string\>

```js
import { analyze } from "@enjoyjs/node-mecab";

const result = await analyze("こんにちは世界");
console.log(result);
```

```bash
こんにちは      感動詞,*,*,*,*,*,こんにちは,コンニチハ,コンニチワ
世界    名詞,一般,*,*,*,*,世界,セカイ,セカイ
EOS
```

### analyzeSync(text: string, options?: [MecabOptions](src/types.ts#L10-L36)): string

```js
import { analyzeSync } from "@enjoyjs/node-mecab";

const result = analyzeSync("こんにちは世界");
console.log(result);
```

### tokenize(text: string, options?: [MecabOptions](src/types.ts#L10-L36)): Promise\<[Token](src/types.ts#L64-L112)[]\>

```js
import { tokenize } from "@enjoyjs/node-mecab";

const result = await tokenize("こんにちは世界");
console.log(result);
```

```bash
[
  # 省略
  {
    id: 12,
    surface: 'こんにちは',
    feature: {
      pos: '感動詞',
      posSubs: [Array],
      conjugatedType: undefined,
      conjugatedForm: undefined,
      basicForm: 'こんにちは',
      reading: 'コンニチハ',
      pronunciation: 'コンニチワ'
    },
    startPosition: 0,
    endPosition: 15,
    rcAttr: 3,
    lcAttr: 3,
    posid: 2,
    charType: 6,
    stat: 'NORMAL',
    isbest: true,
    alpha: 0,
    beta: 0,
    prob: 0,
    cost: 4033,
    _: []
  },
  {
    id: 30,
    surface: '世界',
    feature: {
      pos: '名詞',
      posSubs: [Array],
      conjugatedType: undefined,
      conjugatedForm: undefined,
      basicForm: '世界',
      reading: 'セカイ',
      pronunciation: 'セカイ'
    },
    startPosition: 15,
    endPosition: 21,
    rcAttr: 1285,
    lcAttr: 1285,
    posid: 38,
    charType: 2,
    stat: 'NORMAL',
    isbest: true,
    alpha: 0,
    beta: 0,
    prob: 0,
    cost: 10546,
    _: []
  },
  # 省略
]
```

### tokenizeSync(text: string, options?: [MecabOptions](src/types.ts#L10-L36)): [Token](src/types.ts#L64-L112)[]

```js
import { tokenizeSync } from "@enjoyjs/node-mecab";

const result = tokenizeSync("こんにちは世界");
console.log(result);
```

### wakatsu(text: string, options?: [MecabOptions](src/types.ts#L10-L36)): Promise\<string[][]\>

```js
import { wakatsu } from "@enjoyjs/node-mecab";

const result = await wakatsu("こんにちは世界");
console.log(result);
```

```bash
[ [ 'こんにちは', '世界' ] ]
```

### wakatsuSync(text: string, options?: [MecabOptions](src/types.ts#L10-L36)): string[][]

```js
import { wakatsuSync } from "@enjoyjs/node-mecab";

const result = wakatsuSync("こんにちは世界");
console.log(result);
```

## ライセンス

[MIT License](LICENSE)
