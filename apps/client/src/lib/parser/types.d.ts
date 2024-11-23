export type SupportedFormat = 'RSS' | 'Atom';

export type FeedItem = {
	metaData: {
		id: string;
		pubDate: Date;
		categories?: string[];
		author?: string;
		thumbnail?: string | { src: string; height: number; width: number }[];
	};
	content: {
		title: string;
		description: string;
		link: string;
		content?: string;
	};
};

export type Metadata = {
	title?: string;
	description?: string;
	language?: string;
	link?: string;
	lastUpdated?: Date;
	//If last fetch was error
	hasError?: boolean;
	error?: {
		//Todo refine
		type: 'unsupportedFormat' | 'invalidFormat' | 'httpError';
		details: string;
	};
};
