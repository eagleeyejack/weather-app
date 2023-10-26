import React from "react"

import { createNativeStackNavigator } from "@react-navigation/native-stack"

import HomeScreen from "../current-weather/screens/Home"
import { ForecastRoutes } from "./routes"
import { baseHeaderOptions } from "./styles/header"

const Stack = createNativeStackNavigator()

export type HomeParamList = {
	[ForecastRoutes.FORECAST_HOME_STACK]: undefined
}

export const ForecastStack = () => {
	const stackHeaderOptions = {
		...baseHeaderOptions
	}

	return (
		<Stack.Navigator screenOptions={stackHeaderOptions}>
			<Stack.Screen name="Forecast" component={HomeScreen} />
		</Stack.Navigator>
	)
}
