import {analyze, tokenize, wakatsu} from '../src';

const text = 'すもももももももものうち';

void Promise.all([analyze(text), tokenize(text), wakatsu(text)]).then(
	(results) => {
		for (const result of results) console.log(result);
	}
);
