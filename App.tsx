import React from "react"
import { View } from "react-native"

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigationContainer } from "@react-navigation/native"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Toast from "react-native-toast-message"

import { ConditionsStack } from "./src/navigation/Conditions.Stack"
import { ForecastStack } from "./src/navigation/Forecast.Stack"
import { SearchStack } from "./src/navigation/Search.Stack"
import { SearchProvider } from "./src/shared/context/Search.Context"

const Tab = createBottomTabNavigator()

const queryClient = new QueryClient()

export default function App() {
	return (
		<NavigationContainer>
			<SearchProvider>
				<QueryClientProvider client={queryClient}>
					<Tab.Navigator screenOptions={{ headerShown: false }}>
						<Tab.Screen
							name="HomeStack"
							component={ConditionsStack}
							options={{
								title: "Conditions"
							}}
						/>
						<Tab.Screen
							name="ForecastStack"
							component={ForecastStack}
							options={{
								title: "Forecast"
							}}
						/>
						<Tab.Screen
							name="SearchStack"
							component={SearchStack}
							options={{
								title: "Search"
							}}
						/>
					</Tab.Navigator>
					<Toast />
				</QueryClientProvider>
			</SearchProvider>
		</NavigationContainer>
	)
}
