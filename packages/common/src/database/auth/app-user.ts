const userSchema: RxJsonSchema<UserDocType> = {
	title: 'vendor schema',
	description: 'describes a vendor',
	version: 0,
	keyCompression: false,
	type: 'object',
	properties: {
		name: {
			type: 'string',
		},
		phone: {
			type: 'string',
			primary: true,
		},
		address: {
			type: 'string',
		},
		area: {
			type: 'string',
		},
	},
	required: ['name', 'phone', 'address'],
	indexes: ['phone'],
};

const userCollectionMethods: UserCollectionMethods = {
	async getCount(this: UserCollection) {
		const t0 = timeStart();
		const allDocs = await this.find().exec();
		console.log('Total users Count: ', allDocs.length);
		timeEnd(t0, `getCount - ${allDocs.length}`);
		return allDocs.length;
	},
	async getCountPouch(this: UserCollection) {
		const t0 = timeStart();

		const entries = await this.pouch.allDocs().catch((err) => {
			console.log('failed alldocs', err);
		});
		console.log('Total users Count: ', entries.rows.length);
		timeEnd(t0, `getCountPouch - ${entries.rows.length}`);

		return entries.rows.length;
	},

	async getCountWithInfo(this: UserCollection) {
		const t0 = timeStart();
		const info = await this.pouch.info();
		console.log('Total users Count: ', info.doc_count);
		timeEnd(t0, `getCountWithInfo - ${info.doc_count}`);
		return info.doc_count;
	},

	async getDocs(
		this: UserCollection,
		count: number,
		page = 1,
		saveTimeTaken?: React.Dispatch<React.SetStateAction<[number, number]>>
	) {
		const t0 = timeStart();

		// const allDocs = await this.pouch.allDocs({
		//   include_docs: true,
		//   skip: count * (page - 1),
		//   limit: count,
		// });

		const allDocs = await this.find()
			.skip(count * (page - 1))
			.limit(count)
			.exec();
		console.log(`retrived ${allDocs.length} docs from users (skipped : ${page * count})`);
		const timeTaken = timeEnd(t0, `getDocs - ${allDocs.length} items`);
		saveTimeTaken && saveTimeTaken([timeTaken, allDocs.length]);
		return allDocs;
	},

	async getDocsPouch(this: UserCollection, count: number, page = 0) {
		const t0 = timeStart();
		const allDocs = await this.pouch.allDocs({ include_docs: true });
		timeEnd(t0, `getDocsPouch - ${allDocs.length} items`);
		return allDocs;
	},

	async addDocs(
		this: UserCollection,
		docs: UserDocType[],
		saveTimeTaken?: React.Dispatch<React.SetStateAction<[number, number]>>
	) {
		const t0 = timeStart();
		const res = await this.bulkInsert(docs);
		const timeTaken = timeEnd(t0, `addDocs - ${docs.length} items`);
		saveTimeTaken && saveTimeTaken([timeTaken, docs.length]);

		return res;
	},
};

const collections = [
	{
		name: 'users',
		schema: userSchema,
		// methods: userDocMethods,
		statics: userCollectionMethods,
	},
];

const createDB = async (adapter: IAdapter) => {
	console.log('DatabaseService: creating database..');
	const db: MyDatabase = await createRxDatabase<MyDatabaseCollections>({
		name: 'testdb', // <- name
		adapter: adapter, // <- storage-adapter
		password: 'passpasspass', // <- password (optional)
		multiInstance: false, // This should be set to false when you have single-instances like a single-window electron-app
		eventReduce: true, // <- eventReduce (optional, default: true)
	});

	console.dir(db);
	console.log('DatabaseService: created database');
	// window.db = db; // write to window for debugging

	// create collections
	// console.log("DatabaseService: create collections");
	await Promise.all(collections.map((colData) => db.collection(colData)));

	// hooks
	// console.log("DatabaseService: add hooks");
	// db.heroes.postInsert(
	//   function myPostInsertHook(
	//     this: HeroCollection, // own collection is bound to the scope
	//     _docData: HeroDocType, // documents data
	//     doc: HeroDocument // RxDocument
	//   ) {
	//     console.log(`insert to ${this.name}-collection: ${doc.name}`);
	//   },
	//   false // not async
	// );

	// TODO   : A function to input collectionId, and sync it with firestore db
	// db.$.subscribe((changeEvent) => console.dir(changeEvent));

	return db;
};

const deleteDB = async () => {
	if (!dbPromise) return false;
	const db = await dbPromise;
	await db.destroy();
	await db.remove();
	return true;
};

export const changeAdapter = async (adapter: IAdapter) => {
	console.warn(`re-creating database with adapter '${adapter}'`);
	await deleteDB();
	dbPromise = createDB(adapter);
	return dbPromise;
};

const getDB = async (adpater: IAdapter) => {
	if (!dbPromise) dbPromise = createDB(adpater);
	return dbPromise;
};

// eslint-disable-next-line import/prefer-default-export
export { getDB, supportedAdapters };
