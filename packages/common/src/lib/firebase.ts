import React from 'react';
import firebase from 'react-native-firebase';

/**
 * Context
 */
export const FirebaseContext = React.createContext(firebase);

/**
 * Auth
 */
// @ts-ignore
// export const provider = new firebase.auth.GoogleAuthProvider();
// export const auth = firebase.auth();

export default firebase;
