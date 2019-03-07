import React, { useState } from 'react';
import { View, Text, TouchableHighlight, Modal, Alert } from 'react-native';

type Props = {
	navigation: import('react-navigation').NavigationScreenProp<{}, {}>;
};

const Page = ({ navigation }: Props) => {
	const [modalVisible, setModalVisible] = useState(false);
	return (
		<View style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<View style={{ width: '50%', alignItems: 'center' }}>
				<Text style={{ fontSize: 18 }}>Page</Text>

				<Modal
					animationType="slide"
					transparent={false}
					visible={modalVisible}
					onRequestClose={() => {
						Alert.alert('Modal has been closed.');
					}}
				>
					<View style={{ marginTop: 22 }}>
						<View>
							<Text>Hello World!</Text>

							<TouchableHighlight
								onPress={() => {
									setModalVisible(!modalVisible);
								}}
							>
								<Text>Hide Modal</Text>
							</TouchableHighlight>
						</View>
					</View>
				</Modal>

				<TouchableHighlight
					onPress={() => {
						setModalVisible(true);
					}}
				>
					<Text>Show Modal</Text>
				</TouchableHighlight>
			</View>
		</View>
	);
};

export default Page;
