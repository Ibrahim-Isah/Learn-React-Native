import { View, Text } from 'react-native';
import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Feather } from '@expo/vector-icons';
import CameraScreen from '../../screens/camera';

const Tab = createMaterialBottomTabNavigator();

const EmptyScreen = () => {
	return <View></View>;
};

export default function HomeScreen() {
	return (
		<Tab.Navigator
			barStyle={{ backgroundColor: 'black' }}
			initialRouteName='feed'
		>
			<Tab.Screen
				name='feed'
				component={EmptyScreen}
				options={{
					tabBarIcon: ({ color }) => {
						<Feather name='home' size={24} color={color} />;
					},
				}}
			/>
			<Tab.Screen
				name='Discover'
				component={EmptyScreen}
				options={{
					tabBarIcon: ({ color }) => {
						<Feather name='search' size={24} color={color} />;
					},
				}}
			/>
			<Tab.Screen
				name='Add'
				component={CameraScreen}
				options={{
					tabBarIcon: ({ color }) => {
						<Feather name='plus-square' size={24} color={color} />;
					},
				}}
			/>
			<Tab.Screen
				name='inbox'
				component={EmptyScreen}
				options={{
					tabBarIcon: ({ color }) => {
						<Feather name='message-square' size={24} color={color} />;
					},
				}}
			/>
			<Tab.Screen
				name='Me'
				component={EmptyScreen}
				options={{
					tabBarIcon: ({ color }) => {
						<Feather name='user' size={24} color={color} />;
					},
				}}
			/>
		</Tab.Navigator>
	);
}
