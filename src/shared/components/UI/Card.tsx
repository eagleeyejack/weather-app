import React from "react"
import { StyleSheet, TouchableOpacity, View } from "react-native"

import { colors, spacing } from "../../theme"

const Card = ({ children }) => {
	return <View style={styles.card}>{children}</View>
}

const PressableCard = ({ children, onPress }) => {
	return (
		<View style={styles.card}>
			<TouchableOpacity onPress={onPress}>{children}</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	card: {
		width: "100%",
		borderRadius: 8,
		backgroundColor: colors.white,
		padding: spacing.sm
	}
})

export default Card

export { PressableCard }
