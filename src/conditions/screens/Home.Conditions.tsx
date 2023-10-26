import React from "react"

import { PermissionStatus } from "expo-location"

import Card from "../../shared/components/UI/Card"
import { Fill, Layout } from "../../shared/components/UI/Layout"
import RequestLocationPermissions from "../../shared/components/data-input/RequestLocationPermissions"
import { useSearch } from "../../shared/context/Search.Context"
import { spacing } from "../../shared/theme"
import WeatherOverview from "../components/WeatherOverview"

function ConditionsHomeScreen() {
	const { search, permissions } = useSearch()

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
			</Fill>
		</Layout>
	)
}

export default ConditionsHomeScreen
