import React from "react"

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigationContainer } from "@react-navigation/native"

import Ionicons from "@expo/vector-icons/Ionicons"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Toast from "react-native-toast-message"

import { ConditionsStack } from "./src/navigation/Conditions.Stack"
import { ForecastStack } from "./src/navigation/Forecast.Stack"
import { SearchStack } from "./src/navigation/Search.Stack"
import { SearchProvider } from "./src/shared/context/Search.Context"
import { colors } from "./src/shared/theme"

const Tab = createBottomTabNavigator()

const queryClient = new QueryClient()

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

								if (route.name === "HomeStack") {
									iconName = focused ? "rainy" : "rainy-outline"
								} else if (route.name === "ForecastStack") {
									iconName = focused ? "calendar" : "calendar-outline"
								} else if (route.name === "SearchStack") {
									iconName = focused ? "search" : "search-outline"
								}

								return <Ionicons name={iconName} size={size} color={color} />
							},
							tabBarActiveTintColor: colors.primary,
							tabBarInactiveTintColor: "gray",
							tabBarShowLabel: false
						})}
					>
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
