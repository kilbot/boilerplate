import { useContext } from 'react';

import { DatabaseContext } from '../app';

export default function useDatabase() {
	return useContext(DatabaseContext);
}
