import React from "react"
import { ScrollView, Text, View } from "react-native"

import { RouteProp, useRoute } from "@react-navigation/native"

import { useQuery } from "@tanstack/react-query"

import WeatherDay from "../../shared/components/ForecastDay"
import { getForecast } from "../../shared/db/getForecast"

function LocationScreen() {
	const route: RouteProp<{ params: { location: string } }, "params"> = useRoute()

	const {
		data: forecast,
		isSuccess,
		refetch
	} = useQuery({
		queryKey: ["weather", route.params.location],
		queryFn: async () => getForecast(route.params.location)
	})

	console.log(forecast.forecast)

	return (
		<ScrollView>
			{forecast?.forecast?.forecastday?.map((dayData, index) => (
				<WeatherDay key={index} data={dayData} />
			))}
		</ScrollView>
	)
}

export default LocationScreen
