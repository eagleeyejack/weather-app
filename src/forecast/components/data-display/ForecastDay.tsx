import React from "react"
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native"

import Card from "../../../shared/components/UI/Card"
import { spacing } from "../../../shared/theme"

const WeatherDay = ({ data }) => {
	if (!data) {
		return (
			<Card>
				<View style={styles.container}>
					<ActivityIndicator />
				</View>
			</Card>
		)
	}

	const { date, day, astro } = data
	const { maxtemp_c, mintemp_c, condition, uv } = day
	const { sunrise, sunset } = astro

	return (
		<Card>
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
		</Card>
	)
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		minHeight: 170,
		justifyContent: "center"
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
