import { openDB, type DBSchema, type IDBPDatabase } from 'idb';

interface RSSDBSchema extends DBSchema {
	feeds: {
		key: number;
		value: {
			id: number;
			title: string;
			subtitle?: string;
			url: string;
			link?: string;
			icon?: string;
			lastUpdated: Date;
			lastFetched: Date;
			updateFrequency?: number; // in minutes
			category?: string;
			language?: string;
			isActive: boolean;
		};
		indexes: {
			'by-url': string;
			'by-category': string;
		};
	};
	items: {
		key: number;
		value: {
			id: number;
			feedId: number;
			guid: string;
			title: string;
			link: string;
			content: string;
			contentSnippet?: string;
			author?: string;
			published: Date;
			updated?: Date;
			categories?: string[];
			enclosure?: {
				url: string;
				type: string;
				length?: number;
			};
			read: boolean;
			favorite: boolean;
		};
		indexes: {
			'by-feed': number;
			'by-guid': string;
			'by-date': Date;
			'by-read': boolean;
			'by-favorite': boolean;
		};
	};
}

export class FeedCache {
	private db: IDBPDatabase<RSSDBSchema> | null = null;
	private DB_NAME = 'rss-reader';
	private DB_VERSION = 1;

	async init() {
		if (this.db) return;

		this.db = await openDB<RSSDBSchema>(this.DB_NAME, this.DB_VERSION, {
			upgrade(db, oldVersion) {
				if (oldVersion < 1) {
					// Feeds store
					const feedStore = db.createObjectStore('feeds', {
						keyPath: 'id',
						autoIncrement: true
					});
					feedStore.createIndex('by-url', 'url', { unique: true });
					feedStore.createIndex('by-category', 'category');

					// Items store
					const itemStore = db.createObjectStore('items', {
						keyPath: 'id',
						autoIncrement: true
					});
					itemStore.createIndex('by-feed', 'feedId');
					itemStore.createIndex('by-guid', 'guid', { unique: true });
					itemStore.createIndex('by-date', 'published');
					itemStore.createIndex('by-read', 'read');
					itemStore.createIndex('by-favorite', 'favorite');
				}
			}
		});
	}

	// Feed Operations
	async addFeed(feed: Omit<RSSDBSchema['feeds']['value'], 'id'>) {
		if (!this.db) await this.init();
		return await this.db!.add('feeds', {
			...feed,
			isActive: true,
			lastFetched: new Date()
		});
	}

	async updateFeed(id: number, data: Partial<RSSDBSchema['feeds']['value']>) {
		if (!this.db) await this.init();
		const feed = await this.db!.get('feeds', id);
		if (!feed) throw new Error('Feed not found');
		return await this.db!.put('feeds', { ...feed, ...data });
	}

	async getFeed(id: number) {
		if (!this.db) await this.init();
		return await this.db!.get('feeds', id);
	}

	async getAllFeeds() {
		if (!this.db) await this.init();
		return await this.db!.getAll('feeds');
	}

	// Item Operations
	async addItems(items: Array<Omit<RSSDBSchema['items']['value'], 'id'>>) {
		if (!this.db) await this.init();
		const tx = this.db!.transaction('items', 'readwrite');

		const results = await Promise.allSettled(
			items.map((item) =>
				tx.store.add({
					...item,
					read: false,
					favorite: false
				})
			)
		);

		await tx.done;
		return results;
	}

	async updateItem(id: number, data: Partial<RSSDBSchema['items']['value']>) {
		if (!this.db) await this.init();
		const item = await this.db!.get('items', id);
		if (!item) throw new Error('Item not found');
		return await this.db!.put('items', { ...item, ...data });
	}

	// Timeline Queries
	async getTimeline(
		options: {
			limit?: number;
			offset?: number;
			feedIds?: number[];
			onlyUnread?: boolean;
			onlyFavorites?: boolean;
			startDate?: Date;
			endDate?: Date;
		} = {}
	) {
		if (!this.db) await this.init();

		const {
			limit = 50,
			offset = 0,
			feedIds,
			onlyUnread,
			onlyFavorites,
			startDate,
			endDate
		} = options;

		// Use a compound query when possible
		if (onlyUnread || onlyFavorites) {
			const index = onlyUnread ? 'by-read' : 'by-favorite';
			const value = onlyUnread ? false : true;

			const items = await this.db!.getAllFromIndex('items', index, value);
			return this.filterAndSortItems(items, { feedIds, startDate, endDate, limit, offset });
		}

		// Otherwise, get all items and filter
		const items = await this.db!.getAllFromIndex('items', 'by-date');
		return this.filterAndSortItems(items, { feedIds, startDate, endDate, limit, offset });
	}

	private filterAndSortItems(
		items: RSSDBSchema['items']['value'][],
		options: {
			feedIds?: number[];
			startDate?: Date;
			endDate?: Date;
			limit?: number;
			offset?: number;
		}
	) {
		let filtered = items;

		if (options.feedIds?.length) {
			filtered = filtered.filter((item) => options.feedIds!.includes(item.feedId));
		}

		if (options.startDate) {
			filtered = filtered.filter((item) => item.published >= options.startDate!);
		}

		if (options.endDate) {
			filtered = filtered.filter((item) => item.published <= options.endDate!);
		}

		// Sort by date descending
		filtered.sort((a, b) => b.published.getTime() - a.published.getTime());

		// Apply pagination
		return filtered.slice(options.offset, options.offset + options.limit);
	}

	// Utility Methods
	async markAllRead(feedId?: number) {
		if (!this.db) await this.init();
		const tx = this.db!.transaction('items', 'readwrite');

		let items;
		if (feedId) {
			items = await tx.store.index('by-feed').getAll(feedId);
		} else {
			items = await tx.store.getAll();
		}

		await Promise.all(items.map((item) => tx.store.put({ ...item, read: true })));

		await tx.done;
	}

	async cleanup(
		options: {
			olderThan?: Date;
			keepFavorites?: boolean;
			keepUnread?: boolean;
		} = {}
	) {
		if (!this.db) await this.init();

		const {
			olderThan = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days
			keepFavorites = true,
			keepUnread = true
		} = options;

		const tx = this.db!.transaction('items', 'readwrite');
		const items = await tx.store.getAll();

		for (const item of items) {
			if (
				item.published < olderThan &&
				(!keepFavorites || !item.favorite) &&
				(!keepUnread || item.read)
			) {
				await tx.store.delete(item.id);
			}
		}

		await tx.done;
	}
}
