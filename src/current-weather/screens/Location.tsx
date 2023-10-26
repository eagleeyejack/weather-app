import React from "react"
import { Text, View } from "react-native"

import { RouteProp, useRoute } from "@react-navigation/native"

import { useQuery } from "@tanstack/react-query"

import WeatherInfo from "../../shared/components/WeatherInfo"
import { getWeather } from "../../shared/db/getWeather"

function LocationScreen() {
	const route: RouteProp<{ params: { location: string } }, "params"> = useRoute()

	console.log(route.params.location)

	const {
		data: weather,
		isSuccess,
		refetch
	} = useQuery({
		queryKey: ["weather", route.params.location],
		queryFn: async () => getWeather(route.params.location)
	})

	return (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<WeatherInfo data={weather} />
		</View>
	)
}

export default LocationScreen
