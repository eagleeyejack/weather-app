import React from "react"

import { createNativeStackNavigator } from "@react-navigation/native-stack"

import ConditionsHomeScreen from "../conditions/screens/Home.Conditions"
import { ConditionsRoutes } from "./routes"
import { baseHeaderOptions } from "./styles/header"

const Stack = createNativeStackNavigator()

export type ConditionsParamList = {
	[ConditionsRoutes.CURRENT_WEATHER_HOME_STACK]: undefined
	[ConditionsRoutes.LOCATION]: {
		location: string
	}
}

export const ConditionsStack = () => {
	const stackHeaderOptions = {
		...baseHeaderOptions
	}

	return (
		<Stack.Navigator screenOptions={stackHeaderOptions}>
			<Stack.Screen
				name={ConditionsRoutes.CURRENT_WEATHER_HOME_STACK}
				component={ConditionsHomeScreen}
				options={{
					title: "Conditions"
				}}
			/>
		</Stack.Navigator>
	)
}
