import {exec as _exec} from 'child_process';
import dargs from 'dargs';
import {quote} from 'shell-quote';
import {promisify} from 'util';
import type {Feature, MecabOptions, Stat, Token} from './types';

export {analyze, tokenize, wakatsu};
export type {MecabOptions};

const exec = promisify(_exec);

const isMecabInstalled = async (): Promise<boolean> => {
	try {
		await exec('mecab --version');
		return true;
	} catch {
		return false;
	}
};

const mecabNaToUndefined = (text?: string): string | undefined => {
	return text === '*' ? undefined : text;
};

const getStat = (statId?: string): Stat | undefined => {
	const stats: Stat[] = ['NORMAL', 'UNKNOWN', 'BOS', 'EOS'];
	const id = Number(statId);
	if (Number.isNaN(id)) return;
	const stat = stats[id];
	return stat;
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
		pronunciation
	] = feature?.split(',') ?? [];

	return {
		pos: mecabNaToUndefined(pos),
		posSubs: [
			mecabNaToUndefined(posSub1),
			mecabNaToUndefined(posSub2),
			mecabNaToUndefined(posSub3)
		],
		conjugatedType: mecabNaToUndefined(conjugatedType),
		conjugatedForm: mecabNaToUndefined(conjugatedForm),
		basicForm: mecabNaToUndefined(basicForm),
		reading: mecabNaToUndefined(reading),
		pronunciation: mecabNaToUndefined(pronunciation)
	};
};

const parseDump = (dump: string): Token[] => {
	return dump
		.trim()
		.split('\n')
		.map<Token>((row) => {
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
				stat: getStat(values[9]) ?? 'UNKNOWN',
				isbest: Boolean(Number(values[10])),
				alpha: Number(values[11]),
				beta: Number(values[12]),
				prob: Number(values[13]),
				cost: Number(values[14]),
				_: values.slice(15)
			};
		});
};

const analyze = async (
	text: string,
	options?: Readonly<MecabOptions>
): Promise<string> => {
	if (!(await isMecabInstalled())) {
		throw new Error('`mecab` is not installed');
	}

	const input = quote(['echo', text]);
	const mecab = quote(['mecab', ...dargs(options ?? {})]);
	const command = `${input} | ${mecab}`;
	const {stdout: rawOutput} = await exec(command);
	return rawOutput;
};

const tokenize = async (
	text: string,
	options?: Readonly<MecabOptions>
): Promise<Token[]> => {
	const dump = await analyze(text, {...options, outputFormatType: 'dump'});
	const tokens = parseDump(dump);
	return tokens;
};

const wakatsu = async (
	text: string,
	options?: Readonly<MecabOptions>
): Promise<string[][]> => {
	const wakati = await analyze(text, {...options, outputFormatType: 'wakati'});
	return wakati
		.trim()
		.split('\n')
		.map((row) => row.trim().split(' '));
};
