import firebase from 'firebase';
require('firebase/firebase-auth');

import { USER_STATE_CHANGE } from '../constants';

export const userAuthStateListener = () => (dispatch) => {
	firebase.auth().onAuthStateChanged((user) => {
		if (user) {
			dispatch(getCurrentUserData());
		} else {
			dispatch({ type: USER_STATE_CHANGE, currrentUser: null, loaded: true });
		}
	});
};

export const getCurrentUserData = () => {
	firebase
		.firestore()
		.collection('user')
		.doc(firebase.auth().currentUser.uid)
		.onSnapshot((res) => {
			if (res.exists) {
				return dispatch({
					type: USER_STATE_CHANGE,
					currentUser: res.data(),
					loaded: true,
				});
			}
		});
};

export const login = (email, password) => (dispatch) =>
	new Promise((resolve, reject) => {
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then(() => {
				resolve();
			})
			.catch(() => {
				reject();
			});
	});

export const register = (email, password) => async (dispatch) => {
	// new Promise((resolve, reject) => {
	const createdUserResult = await firebase
		.auth()
		.createUserWithEmailAndPassword(email, password);
	// .then((response) =>

	await firebase
		.firestore()
		.collection('user')
		.add({
			disabled: false,
			displayName: null,
			email: email.toLowerCase(),
			emailVerified: false,
			metadata: {
				creationTime: Date.now(),
			},
			passwordHash: null,
			passwordSalt: null,
			phoneNumber: null,
			photoURL: null,
			providerData: [
				{
					email: email.toLowerCase(),
					providerId: password,
					uid: email.toLowerCase(),
				},
			],
			tokensValidAfterTime: null,
			uid: createdUserResult.user.uid,
		});
	// )
	// .then(() => resolve())
	// .catch((error) => {
	// 	console.log(error);
	// 	reject();
	// });
	// });
};
