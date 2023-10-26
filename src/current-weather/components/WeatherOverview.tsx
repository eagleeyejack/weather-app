import React, { useEffect, useState } from "react"
import { Button, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native"

import { useNavigation } from "@react-navigation/native"

import { useQuery } from "@tanstack/react-query"
import * as Location from "expo-location"

import { CurrentWeatherRoutes } from "../../navigation/routes"
import WeatherInfo from "../../shared/components/WeatherInfo"
import { getWeather } from "../../shared/db/getWeather"

interface IWeatherOverview {
	location: string
}

function WeatherOverview({ location }: IWeatherOverview) {
	const {
		data: weather,
		isSuccess,
		refetch
	} = useQuery({
		queryKey: ["weather", location],
		queryFn: async () => getWeather(location),
		enabled: !!location
	})

	if (weather) {
		return <WeatherInfo data={weather} />
	}

	return <Text>loading...</Text>
}

export default WeatherOverview
