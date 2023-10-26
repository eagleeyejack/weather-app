import React from "react"

import { createNativeStackNavigator } from "@react-navigation/native-stack"

import SearchHomeScreen from "../search/screens/Home.Search"
import LocationScreen from "../search/screens/Location"
import { HeaderBackButton } from "../shared/components/UI/HeaderBackButton"
import { SearchRoutes } from "./routes"
import { baseHeaderOptions } from "./styles/header"

const Stack = createNativeStackNavigator()

export type SearchStackParamsList = {
	[SearchRoutes.SEARCH_HOME_STACK]: undefined
	[SearchRoutes.LOCATION]: {
		location: string
	}
}

export const SearchStack = () => {
	const stackHeaderOptions = {
		...baseHeaderOptions
	}

	return (
		<Stack.Navigator screenOptions={stackHeaderOptions}>
			<Stack.Screen name={SearchRoutes.SEARCH_HOME_STACK} component={SearchHomeScreen} />
			<Stack.Screen
				name={SearchRoutes.LOCATION}
				component={LocationScreen}
				options={({ navigation }) => ({
					title: "Location",
					presentation: "fullScreenModal",
					safeAreaInsets: { top: 0 },
					cardOverlayEnabled: true,
					headerLeft: () => <HeaderBackButton onPress={() => navigation.goBack()} />
				})}
			/>
		</Stack.Navigator>
	)
}
