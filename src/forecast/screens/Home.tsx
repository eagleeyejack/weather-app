import React from "react"
import { ScrollView, Text, TouchableOpacity, View } from "react-native"

import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

import { useQuery } from "@tanstack/react-query"

import { ForecaseParamList } from "../../navigation/Forecast.Stack"
import { ForecastRoutes } from "../../navigation/routes"
import WeatherDay from "../../shared/components/ForecastDay"
import { useSearch } from "../../shared/context/Search.Context"
import { getForecast } from "../../shared/db/getForecast"

function HomeScreen() {
	const { search, setSearch } = useSearch()

	const navigation = useNavigation<NativeStackNavigationProp<ForecaseParamList>>()

	const {
		data: forecast,
		isSuccess,
		refetch
	} = useQuery({
		queryKey: ["weather", search.currentLocation.searchQuery],
		queryFn: async () => getForecast(search.currentLocation.searchQuery)
	})

	return (
		<ScrollView>
			<View style={{ alignItems: "center" }}>
				<Text style={{ fontSize: 24, fontWeight: "bold" }}>
					{forecast?.location.name}, {forecast?.location.region}, {forecast?.location.country}
				</Text>
			</View>
			{forecast?.forecast?.forecastday.map((dayData, index) => (
				<WeatherDay key={index} data={dayData} />
			))}
			{search.locations?.map((location) => {
				return (
					<View
						style={{
							backgroundColor: "red",
							marginTop: 10
						}}
					>
						<TouchableOpacity
							onPress={() => {
								navigation.navigate(ForecastRoutes.LOCATION, {
									location: location?.searchQuery
								})
							}}
						>
							<Text>{location.name}</Text>
						</TouchableOpacity>
					</View>
				)
			})}
		</ScrollView>
	)
}

export default HomeScreen
