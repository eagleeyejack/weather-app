import React, { useState } from "react"
import { Button, Text, TextInput, TouchableOpacity, View } from "react-native"

import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

import { CurrentWeatherParamList } from "../../navigation/CurrentWeather.Stack"
import { CurrentWeatherRoutes } from "../../navigation/routes"
import { useSearch } from "../../shared/context/Search.Context"
import WeatherOverview from "../components/WeatherOverview"

function HomeScreen() {
	const [locationString, setLocationString] = useState("")

	const { search, setSearch } = useSearch()

	const navigation = useNavigation<NativeStackNavigationProp<CurrentWeatherParamList>>()

	return (
		<>
			<TextInput
				value={locationString}
				onChangeText={setLocationString}
				placeholder="Enter a location"
			/>
			<Button
				title="search"
				onPress={() => {
					setSearch.locations([
						...search.locations,

						{
							name: locationString,
							searchQuery: locationString
						}
					])
				}}
			/>
			{search.currentLocation.searchQuery ? (
				<WeatherOverview location={search.currentLocation.searchQuery} />
			) : null}
			{search.locations?.map((location) => {
				return (
					<View
						key={location.searchQuery}
						style={{
							backgroundColor: "red",
							marginTop: 10
						}}
					>
						<TouchableOpacity
							onPress={() => {
								navigation.navigate(CurrentWeatherRoutes.LOCATION, {
									location: location?.searchQuery
								})
							}}
						>
							<Text>{location.name}</Text>
						</TouchableOpacity>
					</View>
				)
			})}
		</>
	)
}

export default HomeScreen
