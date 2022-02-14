import { View, Text } from 'react-native';
import React, { useState } from 'react';
import styles from './style';
import { Image, TouchableOpacity } from 'react-native-web';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

export default function SavePostScreen(props) {
	// console.log(props.route.params.source);
	const [description, setDescription] = useState('');

	const navigation = useNavigation();
	return (
		<View style={styles.container}>
			<View style={styles.formContainer}>
				<TextInput
					style={styles.inputText}
					multiline
					onChangeText={(text) => setDescription(text)}
					maxLength={150}
					placeholder='Describe your video'
				/>

				<Image
					style={styles.mediaPreview}
					source={{ uri: props.route.params.source }}
				/>
			</View>
			<View style={styles.spacer} />
			<View style={styles.buttonContainer}>
				<TouchableOpacity
					onPress={() => navigation.goBack()}
					style={styles.cancelButton}
				>
					<Feather name='x' size={24} color='black' />
					<Text style={styles.cancelButtonText}>Cancel</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => navigation.goBack()}
					style={styles.postButton}
				>
					<Feather name='corner-left-up' size={24} color='white' />
					<Text style={styles.postButtonText}>Post</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
