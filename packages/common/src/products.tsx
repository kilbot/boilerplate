import React from 'react';
import { View, Text, Button } from 'react-native';
import { useObservableSuspense } from 'observable-hooks';

interface Props {
	productsResource: any;
}

const Products = ({ productsResource }: Props) => {
	const products = useObservableSuspense(productsResource);

	return (
		<View>
			{products.map((product) => (
				<View key={product.id} style={{ flexDirection: 'row' }}>
					<Text style={{ padding: 10, width: 200 }}>{product.name}</Text>
					<Text style={{ padding: 10, width: 100 }}>
						{product.categories?.map((category) => (
							<Text key={category.id}>{category.name}, </Text>
						))}
					</Text>
					<Text style={{ padding: 10, width: 100 }}>{product.getFormattedRegularPrice()}</Text>
					<Button
						title="Delete"
						onPress={() => {
							product.remove();
						}}
					/>
				</View>
			))}
		</View>
	);
};

export default Products;
