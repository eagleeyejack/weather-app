import React from "react"
import { ActivityIndicator, ScrollView, Text, View, useWindowDimensions } from "react-native"

import { useQuery } from "@tanstack/react-query"
import { PermissionStatus } from "expo-location"

import Card from "../../shared/components/UI/Card"
import { Fill, Layout } from "../../shared/components/UI/Layout"
import RequestLocationPermissions from "../../shared/components/data-input/RequestLocationPermissions"
import { useSearch } from "../../shared/context/Search.Context"
import { getForecast } from "../../shared/db/getForecast"
import { spacing } from "../../shared/theme"
import ForecastDay from "../components/data-display/ForecastDay"

function ForecastHomeScreen() {
	const { search, permissions } = useSearch()
	const { width } = useWindowDimensions()

	const {
		data: forecast,
		isLoading,
		isSuccess
	} = useQuery({
		queryKey: ["forecast", search.currentLocation.searchQuery],
		queryFn: async () => getForecast(search.currentLocation.searchQuery),
		enabled: !!search.currentLocation.searchQuery
	})

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

	if (isLoading && !isSuccess) {
		return (
			<Layout>
				<Fill
					margin={{
						top: spacing.sm
					}}
				>
					<Card
						style={{
							minHeight: 190
						}}
					>
						<ActivityIndicator />
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
				<View style={{ alignItems: "center", marginBottom: spacing.md }}>
					<Text style={{ fontSize: 18, fontWeight: "bold" }}>
						{forecast?.location.name}, {forecast?.location.country}
					</Text>
				</View>
				<ScrollView>
					{forecast?.forecast?.forecastday.map((dayData) => (
						<View
							key={dayData.date}
							style={{
								width: width - spacing.md,
								marginBottom: spacing.sm
							}}
						>
							<ForecastDay data={dayData} />
						</View>
					))}
				</ScrollView>
			</Fill>
		</Layout>
	)
}

export default ForecastHomeScreen
