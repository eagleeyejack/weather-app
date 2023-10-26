import React from "react"
import { ActivityIndicator } from "react-native"

import { useQuery } from "@tanstack/react-query"
import Toast from "react-native-toast-message"

import Card from "../../shared/components/UI/Card"
import { getWeather } from "../../shared/db/getWeather"
import WeatherInfo from "./data-display/WeatherInfo"

interface IWeatherOverview {
	location: string
}

function WeatherOverview({ location }: IWeatherOverview) {
	const {
		data: weather,
		isSuccess,
		isLoading
	} = useQuery({
		queryKey: ["weather", location],
		queryFn: async () => {
			try {
				const res = getWeather(location)
				return res
			} catch (error) {
				console.error(error)
				Toast.show({
					type: "error",
					text1: "Error",
					text2: error,
					autoHide: false
				})
			}
		},
		enabled: !!location
	})

	if (isLoading && !isSuccess) {
		return (
			<Card
				style={{
					minHeight: 190
				}}
			>
				<ActivityIndicator />
			</Card>
		)
	}

	return <WeatherInfo data={weather} />
}

export default WeatherOverview
