import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase/app';
import Constants from 'expo-constants';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './src/redux/reducers';
import AuthScreen from './src/screens/auth';
import Route from './src/navigation/main';

if (firebase.apps.length === 0) {
	firebase.initializeApp(Constants.manifest.web.config.firebase);
} else {
	firebase.app();
}

const store = createStore(rootReducer, applyMiddleware(thunk));

export default function App() {
	return (
		<Provider store={store}>
			<Route />
		</Provider>
	);
}
