import React from "react"
import { StyleSheet, Text, View } from "react-native"

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigationContainer } from "@react-navigation/native"

import { CurrentWeatherStack } from "./src/navigation/CurrentWeather.Stack"
import { ForecastStack } from "./src/navigation/Forecast.Stack"

const Tab = createBottomTabNavigator()

export default function App() {
	return (
		<NavigationContainer>
			<Tab.Navigator screenOptions={{ headerShown: false }}>
				<Tab.Screen name="HomeStack" component={CurrentWeatherStack} />
				<Tab.Screen name="ForecastStack" component={ForecastStack} />
			</Tab.Navigator>
		</NavigationContainer>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center"
	}
})
