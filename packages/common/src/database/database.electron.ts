import { addRxPlugin, createRxDatabase, checkAdapter } from 'rxdb';
import LevelDbAdapter from 'pouchdb-adapter-leveldb';
import leveldown from 'leveldown';

addRxPlugin(LevelDbAdapter);
// addRxPlugin(httpAdapter);

const _checkAdapter = () => {
	// checkAdapter("localstorage").then((val) => {
	//   console.log("RXJS -> Adapter -> localstorage status :", val);
	//   if (val && supportedAdapters.indexOf("localstorage") === -1)
	//     supportedAdapters.push("localstorage");
	// });
	// checkAdapter("idb").then((val) => {
	//   console.log("RXJS -> Adapter -> idb status :", val);
	//   if (val && supportedAdapters.indexOf("idb") === -1)
	//     supportedAdapters.push("idb");
	// });
	// checkAdapter("memory").then((val) => {
	//   console.log("RXJS -> Adapter -> memory status :", val);
	//   if (val && supportedAdapters.indexOf("memory") === -1)
	//     supportedAdapters.push("memory");
	// });
	checkAdapter('leveldb').then((val) => {
		console.log('RXJS -> Adapter -> sqlite status :', val);
	});
};
_checkAdapter();

const getDatabase = async (name: string) => {
	const db = await createRxDatabase({
		name,
		adapter: leveldown, // the name of your adapter
	});

	return db;
};

export default getDatabase;
