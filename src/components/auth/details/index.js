import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import styles from './styles';
import { useDispatch } from 'react-redux';
import { login, register } from '../../../redux/actions';

export default function AuthDetails({ authPage, setDetailsPage }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const dispatch = useDispatch();

	const handleLogin = () => {
		dispatch(login(email, password))
			.then(() => {
				console.log('login successful');
			})
			.catch(() => {
				console.log('login unsuccessful');
			});
	};

	const handleRegister = () => {
		dispatch(register(email, password))
			.then(() => {
				console.log('Register successful');
			})
			.catch(() => {
				console.log('Register unsuccessful');
			});
	};
	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={() => setDetailsPage(false)}>
				<Feather name='arrow-left' size={40} color='black' />
			</TouchableOpacity>
			<TextInput
				placeholder='Email'
				style={styles.textInput}
				onChangeText={(text) => setEmail(text)}
			/>
			<TextInput
				placeholder='Password'
				secureTextEntry
				style={styles.textInput}
				onChangeText={(text) => setPassword(text)}
			/>
			<TouchableOpacity
				style={styles.button}
				onPress={() => (authPage == 0 ? handleLogin() : handleRegister())}
			>
				<Text style={styles.buttonText}>
					{authPage == 0 ? 'Sign In' : 'Sign Up'}
				</Text>
			</TouchableOpacity>
		</View>
	);
}
