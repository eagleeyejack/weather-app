import React from "react"

import { createNativeStackNavigator } from "@react-navigation/native-stack"

import HomeScreen from "../current-weather/screens/Home"
import LocationScreen from "../current-weather/screens/Location"
import { CurrentWeatherRoutes } from "./routes"
import { baseHeaderOptions } from "./styles/header"

const Stack = createNativeStackNavigator()

export type CurrentWeatherParamList = {
	[CurrentWeatherRoutes.CURRENT_WEATHER_HOME_STACK]: undefined
	[CurrentWeatherRoutes.LOCATION]: {
		location: string
	}
}

export const CurrentWeatherStack = () => {
	const stackHeaderOptions = {
		...baseHeaderOptions
	}

	return (
		<Stack.Navigator screenOptions={stackHeaderOptions}>
			<Stack.Screen name={CurrentWeatherRoutes.CURRENT_WEATHER_HOME_STACK} component={HomeScreen} />
			<Stack.Screen name={CurrentWeatherRoutes.LOCATION} component={LocationScreen} />
		</Stack.Navigator>
	)
}
