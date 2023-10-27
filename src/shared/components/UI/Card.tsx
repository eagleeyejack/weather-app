import React from "react"
import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native"

import { colors, spacing } from "../../theme"

const Card = ({ style, children }: { style?: ViewStyle; children: React.ReactNode }) => {
	return <View style={{ ...styles.card, ...style }}>{children}</View>
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
