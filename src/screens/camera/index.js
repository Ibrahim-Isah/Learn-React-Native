import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Camera } from 'expo-camera';
import { Audio } from 'expo-av';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { useIsFocused } from '@react-navigation/native';
import styles from './style';
import { Image, TouchableOpacity } from 'react-native-web';
import { Feather } from '@expo/vector-icons';

export default function CameraScreen() {
	const [hasCameraPermissions, setHasCameraPermissions] = useState(false);
	const [hasAudioPermissions, setHasAudioPermissions] = useState(false);
	const [hasGalleryPermissions, setHasGalleryPermissions] = useState(false);
	const [galleryItems, setGalleryItems] = useState([]);

	const [cameraRef, setCameraRef] = useState(null);
	const [cameraFlash, setCameraFlash] = useState(
		Camera.Constants.FlashMode.off
	);
	const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);

	const [isCameraReady, setIsCameraReady] = useState(false);

	const isFocused = useIsFocused();

	useEffect(() => {
		(async () => {
			const cameraStatus = await Camera.requestPermissionsAsync();
			setHasCameraPermissions(cameraStatus.status == 'granted');

			const audioStatus = await Audio.requestPermissionsAsync();
			setHasAudioPermissions(audioStatus.status == 'granted');

			const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
			setHasGalleryPermissions(galleryStatus.status == 'granted');

			if (galleryStatus.status == 'granted') {
				const userGalleryMedia = await MediaLibrary.getAssetsAsync({
					sortBy: ['creationTime'],
					mediaType: ['video'],
				});
				setGalleryItems(userGalleryMedia.assets);
			}
		})();
	}, []);

	const recordVideo = async () => {
		if (cameraRef) {
			try {
				const options = {
					maxDuration: 60,
					quality: Camera.Constants.VideoQuality['480'],
				};

				const videoRecordPromise = cameraRef.recordAsync(options);
				if (videoRecordPromise) {
					const data = await videoRecordPromise;

					const source = data.uri;
				}
			} catch (error) {
				console.warn(error);
			}
		}
	};

	const stopVideo = async () => {
		if (cameraRef) {
			cameraRef.stopRecording();
		}
	};

	const pickFromGallery = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Videos,
			allowsEditing: true,
			aspect: [16, 9],
			quality: 1,
		});

		if (!result.cancelled) {
		}
	};

	if (!hasCameraPermissions || !hasAudioPermissions || !hasGalleryPermissions) {
		return <View></View>;
	}
	return (
		<View style={styles.container}>
			{isFocused ? (
				<Camera
					style={styles.camera}
					ref={(ref) => setCameraRef(ref)}
					ratio={'16:9'}
					type={cameraType}
					flashMode={cameraFlash}
					onCameraReady={() => setIsCameraReady(true)}
				/>
			) : null}

			<View style={styles.sideBarContainer}>
				<TouchableOpacity
					style={styles.sideBarButton}
					onPress={() =>
						setCameraType(
							cameraType === Camera.Constants.Type.back
								? Camera.Constants.Type.front
								: Camera.Constants.Type.back
						)
					}
				>
					<Feather name='refresh-ccw' size={24} color={'white'} />
					<Text style={styles.iconText}>Flip</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.sideBarButton}
					onPress={() =>
						setCameraFlash(
							cameraFlash === Camera.Constants.FlashMode.off
								? Camera.Constants.FlashMode.torch
								: Camera.Constants.FlashMode.off
						)
					}
				>
					<Feather name='zap' size={24} color={'white'} />
					<Text style={styles.iconText}>Flash</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.bottomBarContainer}>
				<View style={{ flex: 1 }}></View>
				<View style={styles.recordButtonContainer}>
					<TouchableOpacity
						disabled={!isCameraReady}
						onLongPress={() => recordVideo}
						onPressOut={() => stopVideo()}
						style={styles.recordButton}
					/>
				</View>

				<View style={{ flex: 1 }}>
					<TouchableOpacity
						style={styles.galleryButton}
						onPress={() => pickFromGallery()}
					>
						{galleryItems[0] == undefined ? (
							<></>
						) : (
							<Image
								style={styles.galleryButtonImage}
								source={{ uri: galleryItems[0].uri }}
							/>
						)}
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}
