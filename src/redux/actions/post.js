import firebase from 'firebase';
import { saveMediaToStorage } from './random';
import uuid from 'uuid-random';

require('firebase/firebase-auth');
require('firebase/firestore');

export const createPost = () => (dispatch) =>
	new Promise((resolve, reject) => {
		saveMediaToStorage(video, `post/${firebase.auth().currentUser.uid}`);
	});
