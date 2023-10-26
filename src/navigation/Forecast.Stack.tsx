import React from "react"

import { createNativeStackNavigator } from "@react-navigation/native-stack"

import ForecastHomeScreen from "../forecast/screens/Home.Forecast"
import { ForecastRoutes } from "./routes"
import { baseHeaderOptions } from "./styles/header"

const Stack = createNativeStackNavigator()

export type ForecaseParamList = {
	[ForecastRoutes.FORECAST_HOME_STACK]: undefined
}

export const ForecastStack = () => {
	const stackHeaderOptions = {
		...baseHeaderOptions
	}

	return (
		<Stack.Navigator screenOptions={stackHeaderOptions}>
			<Stack.Screen
				name={ForecastRoutes.FORECAST_HOME_STACK}
				component={ForecastHomeScreen}
				options={{
					title: "Forecast"
				}}
			/>
		</Stack.Navigator>
	)
}
