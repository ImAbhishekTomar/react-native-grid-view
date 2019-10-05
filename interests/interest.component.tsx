import React, { useState } from 'react';
import { Text, View, FlatList } from 'react-native';
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
}

const Item = ({ item, onSelect }) => {
	const [ isSelected, setSelection ] = useState(false);
	const [ selectedItems, setItem ] = useState([]);
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
				onPress={() => {
					setSelection(!isSelected);
					onSelect(item, isSelected, selectedItems);
					if (!isSelected) {
						setItem([ ...selectedItems, JSON.stringify(item) ]);
					} else {
						const data = selectedItems.filter((i) => i.id !== item.id);
						setItem(data);
					}
				}}
				style={{
					flex: 1,
					justifyContent: 'space-evenly',
					alignItems: 'center',
					alignContent: 'center'
				}}
			>
				<Animatable.View
					animation='zoomIn'
					iterationCount={1}
					useNativeDriver={true}
					style={{
						width: isSelected ? 60 : 50,
						height: isSelected ? 60 : 50,
						marginBottom: 10
					}}
				>
					<SvgUri width='100%' height='100%' source={item.image} />
				</Animatable.View>
				<Text>{item.name}</Text>
			</TouchableOpacity>
		</View>
	);
};

class InterestComponent extends React.Component<InterestProps, State> {
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
								onSelect={(i, s, si) => {
									// alert(JSON.stringify(i));
									// console.log(s);
									// console.log(i);
									console.log(si);
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
