# node-mecab

MeCab wrapper for Node.js

## Dependencies

- MeCab
  - [MeCab: Yet Another Part-of-Speech and Morphological Analyzer](https://taku910.github.io/mecab/)
  - [taku910/mecab: Yet another Japanese morphological analyzer](https://github.com/taku910/mecab)

## Install

```bash
npm i @enjoyjs/node-mecab
```

## API

### analyze(text: string, options?: [MecabOptions][mecaboptions]): Promise\<string\>

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

### analyzeSync(text: string, options?: [MecabOptions][mecaboptions]): string

```js
import { analyzeSync } from "@enjoyjs/node-mecab";

const result = analyzeSync("こんにちは世界");
console.log(result);
```

---

### tokenize(text: string, options?: [MecabOptions][mecaboptions]): Promise\<[Token][token][]\>

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
      posSubs: [ undefined, undefined, undefined ],
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
      posSubs: [ '一般', undefined, undefined ],
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

### tokenizeSync(text: string, options?: [MecabOptions][mecaboptions]): [Token][token][]

```js
import { tokenizeSync } from "@enjoyjs/node-mecab";

const result = tokenizeSync("こんにちは世界");
console.log(result);
```

---

### wakati(text: string, options?: [MecabOptions][mecaboptions]): Promise\<string[][]\>

```js
import { wakati } from "@enjoyjs/node-mecab";

const result = await wakati("こんにちは世界");
console.log(result);
```

```bash
[ [ 'こんにちは', '世界' ] ]
```

### wakatiSync(text: string, options?: [MecabOptions][mecaboptions]): string[][]

```js
import { wakatiSync } from "@enjoyjs/node-mecab";

const result = wakatiSync("こんにちは世界");
console.log(result);
```

## Contribution

Issue、Pull requestは日本語で構いません。
不具合等ありましたらPull requestを投げていただけると幸いです。

## License

[MIT License](LICENSE)

[mecaboptions]: src/types.ts#L10-L36
[token]: src/types.ts#L66-L114
