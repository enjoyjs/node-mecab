const {
	analyze,
	analyzeSync,
	tokenize,
	tokenizeSync,
	wakati,
	wakatiSync,
} = require('@enjoyjs/node-mecab');

const text = 'こんにちは世界';

Promise.all([analyze(text), tokenize(text), wakati(text)]).then((results) => {
	for (const result of results) {
		console.dir(result, {depth: null});
	}
});

const syncs = [analyzeSync, tokenizeSync, wakatiSync];

for (const sync of syncs) {
	console.dir(sync(text), {depth: null});
}
