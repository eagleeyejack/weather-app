import React from "react"

import { createNativeStackNavigator } from "@react-navigation/native-stack"

import HomeScreen from "../current-weather/screens/Home"
import { CurrentWeatherRoutes } from "./routes"
import { baseHeaderOptions } from "./styles/header"

const Stack = createNativeStackNavigator()

export type HomeParamList = {
	[CurrentWeatherRoutes.CURRENT_WEATHER_HOME_STACK]: undefined
}

export const CurrentWeatherStack = () => {
	const stackHeaderOptions = {
		...baseHeaderOptions
	}

	return (
		<Stack.Navigator screenOptions={stackHeaderOptions}>
			<Stack.Screen name="Current Weather" component={HomeScreen} />
		</Stack.Navigator>
	)
}
