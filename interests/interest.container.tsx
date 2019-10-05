import React from 'react';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { InterestScreen } from './interest.component';

export class InterestContainer extends React.Component<NavigationStackScreenProps> {
	public render(): React.ReactNode {
		return <InterestScreen />;
	}
}
