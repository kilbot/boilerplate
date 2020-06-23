import React from 'react';
import { View, Text } from 'react-native';
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
					<Text style={{ padding: 10 }}>{product.name}</Text>
					<Text style={{ padding: 10 }}>{product.regular_price}</Text>
				</View>
			))}
		</View>
	);
};

export default Products;
