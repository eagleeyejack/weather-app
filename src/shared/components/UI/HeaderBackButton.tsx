import React from "react"
import { StyleSheet, TouchableOpacity, View } from "react-native"

import Ionicons from "@expo/vector-icons/Ionicons"

export const HeaderBackButton = ({
	onPress,
	testID,
	disabled
}: {
	onPress: () => void
	testID?: string
	disabled?: boolean
}) => {
	return (
		<TouchableOpacity
			style={styles.container}
			onPress={onPress}
			disabled={disabled}
			testID={testID}
		>
			<View style={styles.inner}>
				<Ionicons name="arrow-back-outline" size={20} color="black" />
			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center"
	},
	inner: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		height: 32,
		width: 32,
		borderRadius: 100,
		borderWidth: 1
	}
})
