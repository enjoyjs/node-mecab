import {exec as _exec, execSync} from 'node:child_process';
import {promisify} from 'node:util';
import dargs from 'dargs';
import {quote} from 'shell-quote';
import type {Feature, MecabOptions, Stat, Token} from './types';

export type {Feature, MecabOptions, Stat, Token} from './types';
export {analyze, analyzeSync, tokenize, tokenizeSync, wakatsu, wakatsuSync};

const exec = promisify(_exec);

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
				_: values.slice(15),
			};
		});
};

const mecabCommand = (
	text: string,
	options?: Readonly<MecabOptions>,
): string => {
	const input = quote(['echo', text]);
	const mecab = quote(['mecab', ...dargs(options ?? {})]);
	const command = `${input} | ${mecab}`;
	return command;
};

const analyze = async (
	text: string,
	options?: Readonly<MecabOptions>,
): Promise<string> => {
	const command = mecabCommand(text, options);
	const {stdout: rawOutput} = await exec(command);
	return rawOutput;
};

const analyzeSync = (
	text: string,
	options?: Readonly<MecabOptions>,
): string => {
	const command = mecabCommand(text, options);
	const rawOutput = execSync(command, {encoding: 'utf8'});
	return rawOutput;
};

const tokenize = async (
	text: string,
	options?: Readonly<MecabOptions>,
): Promise<Token[]> => {
	const dump = await analyze(text, {...options, outputFormatType: 'dump'});
	const tokens = parseDump(dump);
	return tokens;
};

const tokenizeSync = (
	text: string,
	options?: Readonly<MecabOptions>,
): Token[] => {
	const dump = analyzeSync(text, {...options, outputFormatType: 'dump'});
	const tokens = parseDump(dump);
	return tokens;
};

const wakatsu = async (
	text: string,
	options?: Readonly<MecabOptions>,
): Promise<string[][]> => {
	const wakati = await analyze(text, {...options, outputFormatType: 'wakati'});
	return wakati
		.trim()
		.split('\n')
		.map((row) => row.trim().split(' '));
};

const wakatsuSync = (
	text: string,
	options?: Readonly<MecabOptions>,
): string[][] => {
	const wakati = analyzeSync(text, {...options, outputFormatType: 'wakati'});
	return wakati
		.trim()
		.split('\n')
		.map((row) => row.trim().split(' '));
};
