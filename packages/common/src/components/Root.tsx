import React, { Component, Fragment } from 'react';
import { SafeAreaView, Alert, Text, View, Image, TextInput } from 'react-native';
// import { ScrollView } from 'react-navigation';

import { generate100, generate10k } from '../models/generate';
import Button from './helpers/Button';
import styles from './helpers/styles';
import BlogList from './BlogList';

import logoSrc from './assets/logo-app.png';

type Props = {
	database: any;
	navigation: any;
	timeToLaunch: string;
};

type State = {
	isGenerating: boolean;
	search: string;
	isSearchFocused: boolean;
};

class Root extends Component<Props, State> {
	public state = {
		isGenerating: false,
		search: '',
		isSearchFocused: false,
	};

	public generateWith = async generator => {
		this.setState({ isGenerating: true });

		const count = await generator(this.props.database);
		Alert.alert(`Generated ${count} records!`);

		this.setState({ isGenerating: false });
	};

	public generate100 = () => this.generateWith(generate100);

	public generate10k = () => this.generateWith(generate10k);

	public handleTextChanges = v => this.setState({ search: v });

	public handleOnFocus = () => this.setState({ isSearchFocused: true });

	public handleOnBlur = () => this.setState({ isSearchFocused: false });

	public render() {
		const { search, isGenerating, isSearchFocused } = this.state;
		const { database, navigation, timeToLaunch } = this.props;

		return (
			<View>
				{!isSearchFocused && (
					<Fragment>
						<Image style={styles.logo} source={logoSrc} />
						<Text style={styles.post}>Launch time: {timeToLaunch} ms</Text>
						<View style={styles.marginContainer}>
							<Text style={styles.header}>Generate:</Text>
							<View style={styles.buttonContainer}>
								<Button title="100 records" onPress={this.generate100} />
								<Button title="10,000 records" onPress={this.generate10k} />
							</View>
						</View>
					</Fragment>
				)}
				<TextInput
					style={{ padding: 5, fontSize: 16 }}
					placeholder="Search ..."
					defaultValue=""
					onFocus={this.handleOnFocus}
					onBlur={this.handleOnBlur}
					onChangeText={this.handleTextChanges}
				/>
				{!isGenerating && <BlogList database={database} search={search} navigation={navigation} />}
			</View>
		);
	}
}

export default Root;
