import React, { useState } from 'react';
import { Alert, Text, View, Image, TextInput } from 'react-native';
// import { ScrollView } from 'react-navigation';
import useDatabase from '../hooks/use-database';
import { generate100, generate10k } from '../models/generate';
import Button from './helpers/Button';
import styles from './helpers/styles';
import BlogList from './BlogList';

import logoSrc from './assets/logo-app.png';

type Props = {
	navigation: any;
	timeToLaunch: string;
};

const Root = ({ timeToLaunch, ...props }: Props) => {
	const [search, setSearch] = useState('');
	const [isGenerating, setIsGenerating] = useState(false);
	const database = useDatabase();

	const generateWith = async generator => {
		setIsGenerating(true);

		const count = await generator(database);
		Alert.alert(`Generated ${count} records!`);

		setIsGenerating(false);
	};

	const handGenerate100 = () => generateWith(generate100);

	const handleGenerate10k = () => generateWith(generate10k);

	const handleTextChanges = (v: string) => setSearch(v);

	return (
		<View>
			<Image style={styles.logo} source={logoSrc} />
			<Text style={styles.post}>Launch time: {timeToLaunch} ms</Text>
			<View style={styles.marginContainer}>
				<Text style={styles.header}>Generate:</Text>
				<View style={styles.buttonContainer}>
					<Button title="100 records" onPress={handGenerate100} />
					<Button title="10,000 records" onPress={handleGenerate10k} />
				</View>
			</View>
			<TextInput
				style={{ padding: 5, fontSize: 16 }}
				placeholder="Search ..."
				defaultValue=""
				onChangeText={handleTextChanges}
			/>
			{!isGenerating && <BlogList search={search} />}
		</View>
	);
};

export default Root;
