import React from "react"

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigationContainer } from "@react-navigation/native"

import Ionicons from "@expo/vector-icons/Ionicons"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Toast from "react-native-toast-message"

import { ConditionsStack } from "./src/navigation/Conditions.Stack"
import { ForecastStack } from "./src/navigation/Forecast.Stack"
import { AppRoutes } from "./src/navigation/routes"
import { SearchProvider } from "./src/shared/context/Search.Context"
import { colors } from "./src/shared/theme"

const Tab = createBottomTabNavigator()

const queryClient = new QueryClient()

export type AppParamsList = {
	[AppRoutes.CONDITIONS_STACK]: undefined
	[AppRoutes.FORECAST_STACK]: undefined
	[AppRoutes.SEARCH_STACK]: undefined
}

export default function App() {
	return (
		<NavigationContainer>
			<SearchProvider>
				<QueryClientProvider client={queryClient}>
					<Tab.Navigator
						screenOptions={({ route }) => ({
							headerShown: false,
							tabBarIcon: ({ focused, color, size }) => {
								let iconName

								if (route.name === AppRoutes.CONDITIONS_STACK) {
									iconName = focused ? "rainy" : "rainy-outline"
								} else if (route.name === AppRoutes.FORECAST_STACK) {
									iconName = focused ? "calendar" : "calendar-outline"
								}

								return <Ionicons name={iconName} size={size} color={color} />
							},
							tabBarActiveTintColor: colors.primary,
							tabBarInactiveTintColor: "gray",
							tabBarShowLabel: false
						})}
					>
						<Tab.Screen
							name={AppRoutes.CONDITIONS_STACK}
							component={ConditionsStack}
							options={{
								title: "Conditions"
							}}
						/>
						<Tab.Screen
							name={AppRoutes.FORECAST_STACK}
							component={ForecastStack}
							options={{
								title: "Forecast"
							}}
						/>
					</Tab.Navigator>
					<Toast />
				</QueryClientProvider>
			</SearchProvider>
		</NavigationContainer>
	)
}
