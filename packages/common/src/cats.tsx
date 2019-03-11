import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
import firebase from './lib/firebase';

const Cats = () => {
	const [img, setImg] = useState('');
	useEffect(() => {
		const image = firebase.storage().ref('cat.gif');
		image.getDownloadURL().then(url => {
			console.log(url);
			setImg(url);
		});
	}, []);
	return <Image style={{ width: 356, height: 200, marginBottom: 20 }} source={{ uri: img }} />;
};

export default Cats;
