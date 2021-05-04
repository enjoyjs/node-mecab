# node-mecab

MeCab wrapper for Node.js

## 前提条件

MeCabがローカルにインストールされている必要があります。

## インストール

```bash
npm i @enjoyjs/node-mecab
```

## API

### analyze(text: string, options?: [MecabOptions](https://github.com/enjoyjs/node-mecab/blob/HEAD/src/types.ts#L10)): Promise\<string\>

```js
import { analyze } from '@enjoyjs/node-mecab';

analyze('こんにちは世界').then(console.log);
```

```bash
こんにちは      感動詞,*,*,*,*,*,こんにちは,コンニチハ,コンニチワ
世界    名詞,一般,*,*,*,*,世界,セカイ,セカイ
EOS

```

### tokenize(text: string, options?: [MecabOptions](https://github.com/enjoyjs/node-mecab/blob/HEAD/src/types.ts#L10)): Promise\<[Token](https://github.com/enjoyjs/node-mecab/blob/HEAD/src/types.ts#L61)[]\>

```js
import { tokenize } from '@enjoyjs/node-mecab';

tokenize('こんにちは世界').then(console.log);
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

### wakatsu(text: string, options?: [MecabOptions](https://github.com/enjoyjs/node-mecab/blob/HEAD/src/types.ts#L10)): Promise\<string[][]\>

```js
import { wakatsu } from '@enjoyjs/node-mecab';

wakatsu('こんにちは世界').then(console.log);
```

```bash
[ [ 'こんにちは', '世界' ] ]
```

## async/await

```js
import { tokenize } from '@enjoyjs/node-mecab';

(async () => {
  const tokens = await tokenize('こんにちは世界');
  console.log(tokens);
})();
```

## ライセンス

[MIT License](LICENSE)
