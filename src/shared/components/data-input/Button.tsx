import * as React from "react"
import { ActivityIndicator, StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native"

import Ionicons from "@expo/vector-icons/Ionicons"

import { colors, radius, spacing } from "../../theme"
import Text from "../data-display/Text"

interface Props {
	onPress: () => void
	label: string
	type?: "primary" | "secondary" | "link"
	testID?: string
	disabled?: boolean
	style?: object
	loading?: boolean
}

function handleButtonType(type: string) {
	switch (type) {
		case "primary":
			return styles.button
		case "secondary":
			return styles.secondaryButton
		case "link":
			return styles.linkButton
		default:
			return styles.button
	}
}

function handleButtonTextType(type: string) {
	switch (type) {
		case "primary":
			return styles.text
		case "secondary":
			return styles.text
		case "link":
			return styles.linkText
		default:
			return styles.text
	}
}

const Button = (props: Props) => {
	return (
		<TouchableOpacity
			testID={props.testID}
			disabled={props.disabled || props.loading}
			style={[
				props.style,
				handleButtonType(props.type),
				props.disabled || props.loading ? styles.disabledButton : null
			]}
			onPress={props.onPress}
		>
			{props.loading ? (
				<ActivityIndicator style={{ height: 21 }} color="#ffffff" />
			) : (
				<Text style={handleButtonTextType(props.type)}>{props.label}</Text>
			)}
		</TouchableOpacity>
	)
}

const ButtonFixed = (props: Props) => {
	return (
		<View
			style={{
				paddingHorizontal: spacing.sm,
				paddingTop: spacing.sm
			}}
		>
			<Button {...props} />
		</View>
	)
}

type IoniconName = "save" | "star" | "heart" | "close"

type merge = Partial<Props> & {
	icon: IoniconName
}

const ButtonSquare = ({ icon, ...props }: merge) => {
	return (
		<TouchableOpacity
			testID={props.testID}
			disabled={props.disabled || props.loading}
			style={[
				props.style,
				handleButtonType(props.type),
				props.disabled || props.loading ? styles.disabledButton : null,
				{
					paddingHorizontal: spacing.xxs,
					paddingVertical: spacing.xxs,
					height: 54,
					width: 54
				}
			]}
			onPress={props.onPress}
		>
			{props.loading ? (
				<ActivityIndicator style={{ height: 21 }} color="#ffffff" />
			) : (
				<Ionicons name={icon} size={24} color="white" />
			)}
		</TouchableOpacity>
	)
}

export { Button, ButtonFixed, ButtonSquare }

const baseButton: ViewStyle = {
	paddingHorizontal: spacing.md,
	paddingVertical: spacing.sm,
	alignItems: "center",
	justifyContent: "center",
	borderTopColor: "#DDDDDD",
	borderRadius: 10,
	position: "relative"
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: colors.primary,
		shadowColor: "#000000",
		elevation: 4,
		shadowRadius: 4,
		shadowOpacity: 0.1,
		shadowOffset: {
			width: 0,
			height: -2
		},
		...baseButton
	},
	secondaryButton: {},
	linkButton: {
		...baseButton,
		backgroundColor: "transparent"
	},
	disabledButton: {
		backgroundColor: "gray"
	},
	text: {
		textAlign: "center",
		color: colors.white,
		fontSize: 16,
		fontWeight: "bold"
	},
	linkText: {
		textAlign: "center",
		color: colors.primary,
		fontSize: 16
	}
})
