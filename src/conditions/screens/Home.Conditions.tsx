import React from "react"
import { View } from "react-native"

import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

import { PermissionStatus } from "expo-location"

import { AppParamsList } from "../../../App"
import { AppRoutes } from "../../navigation/routes"
import Card from "../../shared/components/UI/Card"
import { Fill, Layout } from "../../shared/components/UI/Layout"
import { Button } from "../../shared/components/data-input/Button"
import RequestLocationPermissions from "../../shared/components/data-input/RequestLocationPermissions"
import { useSearch } from "../../shared/context/Search.Context"
import { spacing } from "../../shared/theme"
import WeatherOverview from "../components/WeatherOverview"

function ConditionsHomeScreen() {
	const { search, permissions } = useSearch()

	const navigation = useNavigation<NativeStackNavigationProp<AppParamsList>>()

	/* 
		could wrap the whole app and only allow usage with permissions
		would depend on the app
	*/
	if (permissions.status !== PermissionStatus.GRANTED) {
		return (
			<Layout>
				<Fill
					margin={{
						top: spacing.sm
					}}
				>
					<Card>
						<RequestLocationPermissions />
					</Card>
				</Fill>
			</Layout>
		)
	}

	return (
		<Layout>
			<Fill
				margin={{
					top: spacing.sm
				}}
			>
				<WeatherOverview location={search.currentLocation.searchQuery} />
				<View
					style={{
						marginTop: spacing.sm
					}}
				>
					<Button
						label="Search Locations"
						onPress={() => navigation.navigate(AppRoutes.SEARCH_STACK)}
					/>
				</View>
			</Fill>
		</Layout>
	)
}

export default ConditionsHomeScreen
