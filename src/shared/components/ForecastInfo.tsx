import React from "react"
import { Image, StyleSheet, Text, View } from "react-native"

const WeatherInfo = ({ data }) => {
	const { location, current } = data
	const { name, region, country } = location
	const { temp_c, condition } = current

	if (!data) {
		return <Text>loading...</Text>
	}

	return (
		<View style={styles.container}>
			<Text style={styles.locationText}>
				{name}, {region}, {country}
			</Text>
			<Image style={styles.weatherIcon} source={{ uri: `https:${condition.icon}` }} />
			<Text style={styles.weatherText}>{condition.text}</Text>
			<Text style={styles.temperatureText}>{temp_c}°C</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	locationText: {
		fontSize: 18
	},
	weatherIcon: {
		width: 100,
		height: 100
	},
	weatherText: {
		fontSize: 24
	},
	temperatureText: {
		fontSize: 36
	}
})

export default WeatherInfo
