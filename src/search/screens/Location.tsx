import React from "react"
import { ScrollView, Text, View, useWindowDimensions } from "react-native"

import { RouteProp, useRoute } from "@react-navigation/native"

import { useQuery } from "@tanstack/react-query"

import WeatherInfo from "../../conditions/components/data-display/WeatherInfo"
import WeatherDay from "../../forecast/components/data-display/ForecastDay"
import { Fill, Layout } from "../../shared/components/UI/Layout"
import { getForecast } from "../../shared/db/getForecast"
import { getWeather } from "../../shared/db/getWeather"
import { spacing } from "../../shared/theme"

function LocationScreen() {
	const route: RouteProp<{ params: { location: string } }, "params"> = useRoute()

	const { width } = useWindowDimensions()

	const {
		data: weather,
		isSuccess: weatherIsSuccess,
		refetch: weatherRefetch
	} = useQuery({
		queryKey: ["weather", route.params.location],
		queryFn: async () => getWeather(route.params.location),
		enabled: !!route.params.location
	})

	const {
		data: forecast,
		isLoading: forecastIsLoading,
		isSuccess: forecastIsSuccess,
		refetch: forecastRefetch
	} = useQuery({
		queryKey: ["forecast", route.params.location],
		queryFn: async () => getForecast(route.params.location),
		enabled: !!route.params.location
	})

	return (
		<Layout>
			<Fill
				margin={{
					top: spacing.sm
				}}
			>
				<View
					style={{
						marginBottom: spacing.md
					}}
				>
					<WeatherInfo data={weather} />
				</View>

				<View style={{ alignItems: "center", marginBottom: spacing.md }}>
					<Text style={{ fontSize: 18, fontWeight: "bold" }}>5 day forecast</Text>
				</View>
				<ScrollView>
					{forecast?.forecast?.forecastday?.map((dayData) => (
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

export default LocationScreen
