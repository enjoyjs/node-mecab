import {
	analyze,
	analyzeSync,
	tokenize,
	tokenizeSync,
	wakatsu,
	wakatsuSync,
} from '../src';

const text = 'こんにちは世界';

void Promise.all([analyze(text), tokenize(text), wakatsu(text)]).then(
	(results) => {
		for (const result of results) console.log(result);
	},
);

const syncs = [analyzeSync, tokenizeSync, wakatsuSync];

for (const sync of syncs) console.log(sync(text));
