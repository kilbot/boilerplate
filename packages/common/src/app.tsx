/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { memo } from 'react';
import { StyleSheet, View, Text, Button, TextInput } from 'react-native';
import { ObservableResource } from 'observable-hooks';
import getDatabase from './database';
import productSchema from './database/store/product.schema';
import product from './database/store/product';
import Products from './products';

const productMethods = {
	getFormattedRegularPrice: function () {
		return '$' + parseInt(this.regular_price || 0, 10).toFixed(2);
	},
};

const App = () => {
	const [collection, setCollection] = React.useState();
	const [search, setSearch] = React.useState(' ');

	let productsResource;
	if (collection) {
		const query = collection.find({
			selector: {
				name: { $regex: '.*' + search + '.*' },
			},
		});
		productsResource = new ObservableResource(query.$);
		console.log(query.toJSON());
		query.exec().then((products) => {
			console.log(products);
		});
	}

	React.useEffect(() => {
		(async function init() {
			const database = await getDatabase('example2');
			const collection = await database.collection({
				name: 'products',
				schema: productSchema,
				methods: productMethods,
			});
			setCollection(collection);
		})();
	}, []);

	const updateProduct = async (data) => {
		if (collection) {
			const doc = await collection.upsert(data);
			console.log(doc.toJSON());
		}
	};

	if (!collection) {
		return <Text>loading app...</Text>;
	}

	return (
		<View style={styles.container}>
			<TextInput
				style={{ padding: 5, borderWidth: 1 }}
				onChange={({ target }) => {
					setSearch(target.value);
				}}
			/>
			<Button title="Insert dummy product" onPress={() => updateProduct(product)} />
			<Button
				title="Insert product"
				onPress={() =>
					updateProduct({
						id: 'test2',
						name: 'Test 2',
						categories: [
							{
								id: '9',
								name: 'Clothing',
								slug: 'clothing',
							},
							{
								id: '15',
								name: 'Jorts',
								slug: 'jorts',
							},
						],
					})
				}
			/>
			<React.Suspense fallback={<Text>loading products...</Text>}>
				<Products productsResource={productsResource} />
			</React.Suspense>
		</View>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default memo(App);
