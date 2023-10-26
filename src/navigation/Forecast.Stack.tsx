import React from "react"

import { createNativeStackNavigator } from "@react-navigation/native-stack"

import HomeScreen from "../forecast/screens/Home"
import LocationScreen from "../forecast/screens/Location"
import { ForecastRoutes } from "./routes"
import { baseHeaderOptions } from "./styles/header"

const Stack = createNativeStackNavigator()

export type ForecaseParamList = {
	[ForecastRoutes.FORECAST_HOME_STACK]: undefined
	[ForecastRoutes.LOCATION]: {
		location: string
	}
}

export const ForecastStack = () => {
	const stackHeaderOptions = {
		...baseHeaderOptions
	}

	return (
		<Stack.Navigator screenOptions={stackHeaderOptions}>
			<Stack.Screen name={ForecastRoutes.FORECAST_HOME_STACK} component={HomeScreen} />
			<Stack.Screen name={ForecastRoutes.LOCATION} component={LocationScreen} />
		</Stack.Navigator>
	)
}
