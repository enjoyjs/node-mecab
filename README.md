# node-mecab

MeCab wrapper for Node.js

## インストール

```bash
npm i @enjoyjs/node-mecab
```

## API

### analyze

```js
import { analyze } from '@enjoyjs/node-mecab';

analyze('こんにちは世界').then(console.log);
```

```bash
こんにちは      感動詞,*,*,*,*,*,こんにちは,コンニチハ,コンニチワ
世界    名詞,一般,*,*,*,*,世界,セカイ,セカイ
EOS

```

### tokenize

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

### wakatsu

```js
import { wakatsu } from '@enjoyjs/node-mecab';

wakatsu('こんにちは世界').then(console.log);
```

```bash
[ [ 'こんにちは', '世界' ] ]
```

## ライセンス

[MIT License](LICENSE)
