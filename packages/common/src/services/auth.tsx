import firebase from '../lib/firebase';
import { GoogleSignin } from 'react-native-google-signin';

export default class AuthService {
	public async login() {
		await GoogleSignin.configure();

		const data = await GoogleSignin.signIn();

		const credential = firebase.auth.GoogleAuthProvider.credential(
			data.idToken,
			// @ts-ignore
			data.accessToken
		);

		const result = await firebase.auth().signInWithCredential(credential);
		return result.user;
	}
}
