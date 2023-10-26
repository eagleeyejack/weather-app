import React from "react"
import { StyleProp, StyleSheet, Text as TextRN } from "react-native"

import { colors } from "../../theme"

function handleSize(size: "xxl" | "xl" | "l" | "m" | "s" | "xs" = "m") {
	switch (size) {
		case "xxl":
			return designSystem.headingXXl
		case "xl":
			return designSystem.headingXl
		case "l":
			return designSystem.headingL
		case "m":
			return designSystem.textM
		case "s":
			return designSystem.textS
		case "xs":
			return designSystem.textXs
		default:
			return designSystem.textM
	}
}

function handleWeight(weight: "600" | "400" = "400") {
	switch (weight) {
		case "400":
			return designSystem.weight400
		default:
			return designSystem.textM
	}
}

const Text = ({
	size = "m",
	weight = "400",
	align = "left",
	numberOfLines,
	style,
	children,
	testID,
	onPress
}: {
	size?: "xxl" | "xl" | "l" | "m" | "s" | "xs"
	weight?: "600" | "400"
	align?: "left" | "center" | "right"
	numberOfLines?: number
	style?: StyleProp<any>
	testID?: string
	children: React.ReactNode
	onPress?: () => void
}) => {
	return (
		<TextRN
			testID={testID}
			onPress={onPress}
			numberOfLines={numberOfLines}
			style={{
				...handleWeight(weight),
				...handleSize(size),
				...designSystem.textColor,
				textAlign: align,
				width: "100%",
				...style
			}}
		>
			{children}
		</TextRN>
	)
}

export default Text

export const designSystem = StyleSheet.create({
	textColor: {
		color: colors.primary
	},
	headingXXl: {
		fontSize: 48,
		fontWeight: "600"
	},
	headingXl: {
		fontSize: 36,
		fontWeight: "600"
	},
	headingL: {
		fontSize: 24,
		fontWeight: "600"
	},
	HeadingM: {
		fontSize: 18,
		fontWeight: "600"
	},
	textM: {
		fontSize: 16
	},
	textS: {
		fontSize: 14
	},
	textXs: {
		fontSize: 12
	},
	weight400: {
		fontWeight: "400"
	}
})
