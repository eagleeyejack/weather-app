import React from "react"
import { StyleSheet, Text, View } from "react-native"

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigationContainer } from "@react-navigation/native"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { CurrentWeatherStack } from "./src/navigation/CurrentWeather.Stack"
import { ForecastStack } from "./src/navigation/Forecast.Stack"
import { SearchProvider } from "./src/shared/context/Search.Context"

const Tab = createBottomTabNavigator()

const queryClient = new QueryClient()

export default function App() {
	return (
		<NavigationContainer>
			<SearchProvider>
				<QueryClientProvider client={queryClient}>
					<Tab.Navigator screenOptions={{ headerShown: false }}>
						<Tab.Screen name="HomeStack" component={CurrentWeatherStack} />
						<Tab.Screen name="ForecastStack" component={ForecastStack} />
					</Tab.Navigator>
				</QueryClientProvider>
			</SearchProvider>
		</NavigationContainer>
	)
}
