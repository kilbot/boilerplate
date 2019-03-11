import firebase from '../lib/firebase';
import 'firebase/auth';

export default class AuthService {
	public provider: any;
	public auth: any;

	public constructor() {
		// @ts-ignore
		this.provider = new firebase.auth.GoogleAuthProvider();
		this.auth = firebase.auth();
	}

	public async login() {
		const result = await this.auth.signInWithPopup(this.provider);
		return result.user;
	}
}
