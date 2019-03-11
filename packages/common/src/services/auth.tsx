import firebase from '../lib/firebase';
import { GoogleSignin } from 'react-native-google-signin';

export default class AuthService {
	public async login() {
		try {
			console.log('start');
			await GoogleSignin.configure();
			console.log('await user info');
			const data = await GoogleSignin.signIn();
			console.log(data);

			const credential = firebase.auth.GoogleAuthProvider.credential(
				data.idToken,
				// @ts-ignore
				data.accessToken
			);
			console.log(credential);

			const result = await firebase.auth().signInWithCredential(credential);
			console.log(result);
			return result.user;
		} catch (error) {
			console.log(error);
		}
	}
}
