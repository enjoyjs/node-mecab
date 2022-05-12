import dargs from 'dargs';
import execa from 'execa';
import type {Feature, MecabOptions, Stat, Token} from './types.js';

export type {
	Feature,
	MecabOptions,
	Stat,
	Stats,
	Token,
	OutputFormatType,
} from './types.js';
export {analyze, analyzeSync, tokenize, tokenizeSync, wakatsu, wakatsuSync};

const mecabNaToUndefined = (text?: string): string | undefined => {
	return text === '*' ? undefined : text;
};

const getStat = (statId?: string): Stat => {
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

const parseFeature = (feature?: string): Feature => {
	const [
		pos,
		posSub1,
		posSub2,
		posSub3,
		conjugatedType,
		conjugatedForm,
		basicForm,
		reading,
		pronunciation,
	] = feature?.split(',') ?? [];

	return {
		pos: mecabNaToUndefined(pos),
		posSubs: [
			mecabNaToUndefined(posSub1),
			mecabNaToUndefined(posSub2),
			mecabNaToUndefined(posSub3),
		],
		conjugatedType: mecabNaToUndefined(conjugatedType),
		conjugatedForm: mecabNaToUndefined(conjugatedForm),
		basicForm: mecabNaToUndefined(basicForm),
		reading: mecabNaToUndefined(reading),
		pronunciation: mecabNaToUndefined(pronunciation),
	};
};

const parseDump = (dump: string): Token[] => {
	return dump.split('\n').map<Token>((row) => {
		const values = row.split(' ');
		return {
			id: Number(values[0]),
			surface: values[1] ?? '',
			feature: parseFeature(values[2]),
			startPosition: Number(values[3]),
			endPosition: Number(values[4]),
			rcAttr: Number(values[5]),
			lcAttr: Number(values[6]),
			posid: Number(values[7]),
			charType: Number(values[8]),
			stat: getStat(values[9]),
			isbest: Boolean(Number(values[10])),
			alpha: Number(values[11]),
			beta: Number(values[12]),
			prob: Number(values[13]),
			cost: Number(values[14]),
			_: values.slice(15),
		};
	});
};

const analyze = async (
	text: string,
	options: Readonly<MecabOptions> = {},
): Promise<string> => {
	const {stdout} = await execa('mecab', dargs(options), {input: text});
	return stdout;
};

const analyzeSync = (
	text: string,
	options: Readonly<MecabOptions> = {},
): string => {
	const {stdout} = execa.sync('mecab', dargs(options), {input: text});
	return stdout;
};

const tokenize = async (
	text: string,
	options?: Readonly<MecabOptions>,
): Promise<Token[]> => {
	const dump = await analyze(text, {...options, outputFormatType: 'dump'});
	return parseDump(dump);
};

const tokenizeSync = (
	text: string,
	options?: Readonly<MecabOptions>,
): Token[] => {
	const dump = analyzeSync(text, {...options, outputFormatType: 'dump'});
	return parseDump(dump);
};

const wakatsu = async (
	text: string,
	options?: Readonly<MecabOptions>,
): Promise<string[][]> => {
	const wakati = await analyze(text, {...options, outputFormatType: 'wakati'});
	return wakati.split('\n').map((row) => row.trim().split(' '));
};

const wakatsuSync = (
	text: string,
	options?: Readonly<MecabOptions>,
): string[][] => {
	const wakati = analyzeSync(text, {...options, outputFormatType: 'wakati'});
	return wakati.split('\n').map((row) => row.trim().split(' '));
};
