import { useContext } from 'react';
import { FirebaseContext } from '../firebase';

function useFirebase() {
	return useContext(FirebaseContext);
}

export default useFirebase;
