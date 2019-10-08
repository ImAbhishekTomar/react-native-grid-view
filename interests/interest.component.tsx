import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, ActivityIndicator, Image } from 'react-native';
import { StyleType, ThemedComponentProps, ThemeType, withStyles } from '@kitten/theme';
import SvgUri from 'react-native-svg-uri';
import InterestsMockup from '../../../DataAccess/mockups/InterestsMockup';
import Interest from '../../../DataAccess/Interest/Interest';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CheckBox } from 'react-native-ui-kitten';
import { boolean } from 'yup';
import { handler } from 'firebase-functions';
import * as Animatable from 'react-native-animatable';

interface InterestComponentProps {
	test?: any;
}

export type InterestProps = ThemedComponentProps & InterestComponentProps;

interface State {
	opacityFlag?: boolean;
	testJson?: any;
}

// function LazyImageLoad(source: any, ImageLoaded: boolean, ImageType: string | 'svg' | 'other') {
// 	if (ImageType === 'svg') {
// 		return ImageLoaded ? <ActivityIndicator /> : <SvgUri width='100%' height='100%' source={source} />;
// 	} else {
// 		return ImageLoaded ? (
// 			<ActivityIndicator />
// 		) : (
// 			<Image style={{ width: '100%', height: '100%' }} source={source} />
// 		);
// 	}
// }

const LazyImageLoad = ({ source, ImageLoaded, ImageType }) => {
	if (ImageType === 'svg') {
		return ImageLoaded ? <ActivityIndicator /> : <SvgUri width='100%' height='100%' source={source} />;
	} else {
		return ImageLoaded ? (
			<ActivityIndicator />
		) : (
			<Image style={{ width: '100%', height: '100%' }} source={source} />
		);
	}
};

const Item = ({ item, onSelect }) => {
	const [ isSelected, setSelected ] = useState(false);
	const [ selectedItems, setItem ] = useState([]);
	const [ imageLoading, setLoading ] = useState(false);

	const handlerPress = () => {
		const ItemExist = selectedItems.filter((f) => f.id === item.id);
		if (ItemExist.length > 0) {
			setSelected(false);
			const dataAfterRemove = selectedItems.filter((f) => f.id !== item.id);
			setItem([ ...dataAfterRemove ]);
		} else {
			setSelected(true);
			setItem([ ...selectedItems, JSON.stringify(item) ]);
		}
		onSelect(item, selectedItems);
	};

	return (
		<View
			style={{
				borderColor: '#F5F5F5',
				borderWidth: 0.5,
				flex: 1,
				padding: 8,
				justifyContent: 'space-evenly',
				alignItems: 'center',
				alignContent: 'center',
				height: 130,
				backgroundColor: isSelected ? '#ECC62F' : '#fff',
				opacity: 1
			}}
		>
			<TouchableOpacity
				onPress={handlerPress}
				style={{
					flex: 1,
					justifyContent: 'space-evenly',
					alignItems: 'center',
					alignContent: 'center'
				}}
			>
				<View
					style={{
						width: isSelected ? 60 : 50,
						height: isSelected ? 60 : 50,
						marginBottom: 10
					}}
				>
					{/* <SvgUri width='100%' height='100%' source={item.image} /> */}
					<LazyImageLoad ImageType='svg' ImageLoaded={imageLoading} source={item.image} />
				</View>
				<Text>{item.name}</Text>
			</TouchableOpacity>
		</View>
	);
};

class InterestComponent extends React.Component<InterestProps, State> {
	state: State = { testJson: null };
	public render(): React.ReactNode {
		return (
			<View style={{ flex: 1, marginTop: 10 }}>
				<View
					style={{
						flex: 1,
						flexDirection: 'row'
					}}
				>
					<FlatList
						horizontal={false}
						numColumns={3}
						data={InterestsMockup}
						renderItem={({ item }) => (
							<Item
								onSelect={(currentItem: any, selectedItems: any) => {
									console.log('current Item: ', currentItem);
									console.log('selected Items: ', selectedItems);
								}}
								item={item}
							/>
						)}
						keyExtractor={(item) => item.id}
					/>
				</View>
			</View>
		);
	}
}

const _renderItem = ({ item }) => (
	<View style={{ flex: 1 }}>
		<Text>{item.id}</Text>
	</View>
);

export const InterestScreen = withStyles(InterestComponent, (theme: ThemeType) => ({
	container: {
		flex: 1
	}
}));
