import type {Stat} from './types.js';

// Convert MeCab N/A value (*) to `undefined`
export const mecabNaToUndefined = (text?: string): string | undefined => {
	return text === '*' ? undefined : text;
};

export const getStat = (statId?: string): Stat => {
	switch (statId) {
		case '0':
			return 'NORMAL';
		case '1':
			return 'UNKNOWN';
		case '2':
			return 'BOS';
		case '3':
			return 'EOS';
		case '4':
			return 'EON';
		default:
			return 'UNKNOWN';
	}
};
