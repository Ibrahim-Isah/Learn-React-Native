import { useState, useEffect, useContext } from 'react';
import FirebaseContext from '../context/firebase';

const useAuthListener = () => {
	const [user, setUser] = useState(
		JSON.parse(localStorage.getItem('authUser'))
	);
	const { firebase } = useContext(FirebaseContext);

	useEffect(() => {
		const listener = firebase.auth().onAuthStateChanged((authUser) => {
			//if we have a user then get it from the local storage
			if (authUser) {
				localStorage.setItem('authUser', JSON.stringify(authUser));
				setUser(authUser);
			} else {
				//if we dont have a user we clear the localStorage
				localStorage.removeItem('authUser');
				setUser(null);
			}
		});
		return () => listener();
	}, [firebase]);

	return { user };
};

export default useAuthListener;
