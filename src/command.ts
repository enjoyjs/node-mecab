import dargs from 'dargs';
import execa from 'execa';
import {parseDump} from './parser.js';
import type {MecabOptions, Token} from './types.js';

export const analyze = async (
	text: string,
	options: Readonly<MecabOptions> = {},
): Promise<string> => {
	const {stdout} = await execa('mecab', dargs(options), {input: text});
	return stdout;
};

export const analyzeSync = (
	text: string,
	options: Readonly<MecabOptions> = {},
): string => {
	const {stdout} = execa.sync('mecab', dargs(options), {input: text});
	return stdout;
};

export const tokenize = async (
	text: string,
	options: Readonly<MecabOptions> = {},
): Promise<Token[]> => {
	const dump = await analyze(text, {...options, outputFormatType: 'dump'});
	return parseDump(dump);
};

export const tokenizeSync = (
	text: string,
	options: Readonly<MecabOptions> = {},
): Token[] => {
	const dump = analyzeSync(text, {...options, outputFormatType: 'dump'});
	return parseDump(dump);
};

export const wakati = async (
	text: string,
	options: Readonly<MecabOptions> = {},
): Promise<string[][]> => {
	const wakati = await analyze(text, {...options, outputFormatType: 'wakati'});
	return wakati.split(/\r?\n/).map((row) => row.trim().split(' '));
};

export const wakatiSync = (
	text: string,
	options: Readonly<MecabOptions> = {},
): string[][] => {
	const wakati = analyzeSync(text, {...options, outputFormatType: 'wakati'});
	return wakati.split(/\r?\n/).map((row) => row.trim().split(' '));
};
