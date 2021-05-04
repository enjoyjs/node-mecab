type OutputFormatType =
	| 'wakati'
	| 'yomi'
	| 'chasen'
	| 'dump'
	| 'simple'
	| 'none'
	| 'em';

export interface MecabOptions {
	rcfile?: string;
	dicdir?: string;
	userdic?: string;
	latticeLevel?: number;
	dictionaryInfo?: boolean;
	outputFormatType?: OutputFormatType;
	allMorphs?: boolean;
	nbest?: number;
	partial?: boolean;
	marginal?: boolean;
	maxGroupingSize?: number;
	nodeFormat?: string;
	unkFormat?: string;
	bosFormat?: string;
	eosFormat?: string;
	eonFormat?: string;
	unkFeature?: string;
	inputBufferSize?: number;
	dumpConfig?: boolean;
	allocateSentence?: boolean;
	theta?: number;
	costFactor?: number;
	output?: string;
}

export interface Feature {
	// 品詞
	pos?: string;

	// 品詞細分類1, 品詞細分類2, 品詞細分類3
	posSubs: [string | undefined, string | undefined, string | undefined];

	// 活用型
	conjugatedType?: string;

	// 活用形
	conjugatedForm?: string;

	// 原形
	basicForm?: string;

	// 読み
	reading?: string;

	// 発音
	pronunciation?: string;
}

export type Stat = 'NORMAL' | 'UNKNOWN' | 'BOS' | 'EOS';

export interface Token {
	// Node id
	id: number;

	// 形態素の文字列情報
	surface: string;

	// 素性情報
	feature: Feature;

	// 形態素の始端
	startPosition: number;

	// 形態素の終端
	endPosition: number;

	// 右文脈 id
	rcAttr: number;

	// 左文脈 id
	lcAttr: number;

	// 形態素 id
	posid: number;

	// 文字種情報
	charType: number;

	// 形態素の種類
	stat: Stat;

	// ベスト解かどうか
	isbest: boolean;

	// Forward log 確率
	alpha: number;

	// Backward log 確率
	beta: number;

	// 周辺確率
	prob: number;

	// 単語生起コスト
	cost: number;

	_: string[];
}
