import React from "react"
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native"

import Card from "../../../shared/components/UI/Card"
import { spacing } from "../../../shared/theme"

interface WeatherInfoProps {
	data: {
		location: {
			name: string
			country: string
		}
		current: {
			temp_c: number
			condition: {
				text: string
				icon: string
			}
		}
	}
}

const WeatherInfo: React.FC<WeatherInfoProps> = React.memo(
	({ data }) => {
		if (!data) {
			return (
				<Card>
					<View style={styles.container}>
						<ActivityIndicator />
					</View>
				</Card>
			)
		}

		const { location, current } = data
		const { name, country } = location
		const { temp_c, condition } = current

		return (
			<Card>
				<View style={styles.container}>
					<Text style={styles.locationText} testID="location">
						{name}, {country}
					</Text>
					<View style={styles.weatherContainer}>
						<View style={styles.iconContainer}>
							<Image style={styles.weatherIcon} source={{ uri: `https:${condition.icon}` }} />
						</View>
						<View>
							<Text style={styles.weatherText} testID="weather-condition">
								{condition.text}
							</Text>
							<Text style={styles.temperatureText} testID="temperature">
								{temp_c}°C
							</Text>
						</View>
					</View>
				</View>
			</Card>
		)
	},
	(prevProps, nextProps) => {
		return prevProps.data === nextProps.data
	}
)

WeatherInfo.displayName = "WeatherInfo"

const styles = StyleSheet.create({
	container: {
		height: 180,
		justifyContent: "center",
		alignItems: "center"
	},
	iconContainer: {
		width: 100,
		height: 100,
		justifyContent: "center",
		alignItems: "center"
	},
	weatherContainer: {
		flexDirection: "row",
		width: "100%",
		alignItems: "center"
	},
	locationText: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: spacing.sm
	},
	weatherIcon: {
		width: 100,
		height: 100
	},
	weatherText: {
		fontSize: 24
	},
	temperatureText: {
		fontSize: 36,
		fontWeight: "bold"
	}
})

export default WeatherInfo
