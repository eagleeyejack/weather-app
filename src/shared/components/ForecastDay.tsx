import React from "react"
import { Image, StyleSheet, Text, View } from "react-native"

const WeatherDay = ({ data }) => {
	const { date, day, astro } = data
	const { maxtemp_c, mintemp_c, condition, uv } = day
	const { sunrise, sunset } = astro

	return (
		<View style={styles.container}>
			<Text style={styles.dateText}>{date}</Text>
			<Image style={styles.weatherIcon} source={{ uri: `https:${condition.icon}` }} />
			<Text style={styles.weatherText}>{condition.text}</Text>
			<Text style={styles.temperatureText}>
				Max: {maxtemp_c}°C, Min: {mintemp_c}°C
			</Text>
			<Text style={styles.uvText}>UV Index: {uv}</Text>
			<Text style={styles.sunText}>
				Sunrise: {sunrise}, Sunset: {sunset}
			</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		margin: 10,
		padding: 10,
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 5,
		alignItems: "center"
	},
	dateText: {
		fontSize: 18,
		fontWeight: "bold"
	},
	weatherIcon: {
		width: 100,
		height: 100
	},
	weatherText: {
		fontSize: 16
	},
	temperatureText: {
		fontSize: 14
	},
	uvText: {
		fontSize: 14
	},
	sunText: {
		fontSize: 14
	}
})

export default WeatherDay
