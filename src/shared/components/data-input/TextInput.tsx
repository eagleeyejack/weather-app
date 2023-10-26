import React from "react"
import { TextInput as RNTextInput, StyleSheet } from "react-native"

import { colors, spacing } from "../../theme"

const TextInput = ({
	last,
	label,
	value,
	type,
	keyboardType = "default",
	onChange
}: {
	last?: boolean
	label: string
	value: string
	type?: string
	keyboardType?: "email-address" | "default" | "numeric" | "phone-pad" | "number-pad"
	onChange: (value: string) => void
}) => {
	return (
		<RNTextInput
			secureTextEntry={type === "password"}
			keyboardType={keyboardType}
			placeholder={label}
			onChangeText={onChange}
			style={{ ...styles.input, ...(last && { marginBottom: 0 }) }}
			value={value}
			autoCapitalize="none"
		/>
	)
}

const styles = StyleSheet.create({
	input: {
		marginBottom: spacing.sm,
		padding: spacing.sm,
		borderWidth: 1,
		borderColor: colors.white,
		borderRadius: 10,
		backgroundColor: colors.white,
		fontSize: 16,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 0.2
		},
		shadowOpacity: 0.23,
		shadowRadius: 0.3,
		elevation: 1
	}
})

export default TextInput
