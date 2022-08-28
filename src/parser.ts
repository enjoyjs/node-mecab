import type {Feature, Token} from './types.js';
import {getStat, mecabNaToUndefined} from './util.js';

export const parseFeature = (feature = ''): Feature => {
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
	] = feature.split(',');

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

export const parseDump = (dump: string): Token[] => {
	return dump.split(/\r?\n/).map<Token>((row) => {
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
