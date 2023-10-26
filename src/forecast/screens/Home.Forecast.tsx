import React from "react"
import { ActivityIndicator, ScrollView, Text, View, useWindowDimensions } from "react-native"

import { useQuery } from "@tanstack/react-query"

import Card from "../../shared/components/UI/Card"
import { Fill, Layout } from "../../shared/components/UI/Layout"
import { useSearch } from "../../shared/context/Search.Context"
import { getForecast } from "../../shared/db/getForecast"
import { spacing } from "../../shared/theme"
import WeatherDay from "../components/data-display/ForecastDay"

function ForecastHomeScreen() {
	const { search } = useSearch()
	const { width } = useWindowDimensions()

	const {
		data: forecast,
		isLoading,
		isSuccess
	} = useQuery({
		queryKey: ["forecast", search.currentLocation.searchQuery],
		queryFn: async () => getForecast(search.currentLocation.searchQuery)
	})

	if (isLoading && !isSuccess) {
		return (
			<Card>
				<ActivityIndicator />
			</Card>
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
							<WeatherDay data={dayData} />
						</View>
					))}
				</ScrollView>
			</Fill>
		</Layout>
	)
}

export default ForecastHomeScreen
