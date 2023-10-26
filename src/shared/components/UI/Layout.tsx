import React from "react"
import {
	KeyboardAvoidingView,
	Platform,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	View
} from "react-native"

import { useHeaderHeight } from "@react-navigation/elements"

import { colors, spacing } from "../../theme"

const Layout = ({ backgroundColor, children }: { backgroundColor?: string; children: any }) => {
	return (
		<SafeAreaView
			style={{
				...styles.container,
				...(backgroundColor && { backgroundColor })
			}}
		>
			{children}
		</SafeAreaView>
	)
}

const Fill = ({
	center,
	margin,
	padding,
	backgroundColor,
	scroll,
	children
}: {
	center?: boolean
	margin?: {
		top?: number
		left?: number
		right?: number
		bottom?: number
	}
	padding?: {
		top?: number
		left?: number
		right?: number
		bottom?: number
	}
	scroll?: {
		decelerationRate: "fast"
		snapToInterval: number
		showsVerticalScrollIndicator?: boolean
	}
	backgroundColor?: string
	children: any
}) => {
	return (
		<ScrollView
			decelerationRate={scroll?.decelerationRate ? scroll?.decelerationRate : undefined}
			snapToInterval={scroll?.snapToInterval}
			showsVerticalScrollIndicator={scroll?.showsVerticalScrollIndicator}
			style={{
				flex: 1
			}}
			contentContainerStyle={{
				paddingHorizontal: spacing.sm,
				...{ ...(center && styles.center) },
				...(backgroundColor && { backgroundColor })
			}}
		>
			<View
				style={{
					...{
						...(margin && {
							marginTop: margin.top,
							marginLeft: margin.left,
							marginRight: margin.right,
							marginBottom: margin.bottom
						})
					},
					...{
						...(padding && {
							paddingTop: padding.top,
							paddingLeft: padding.left,
							paddingRight: padding.right,
							paddingBottom: padding.bottom
						})
					}
				}}
			>
				{children}
			</View>
		</ScrollView>
	)
}

const KeyboardLayout = ({
	offset,
	margin,
	children
}: {
	offset?: number
	margin?: {
		top?: number
		left?: number
		right?: number
		bottom?: number
	}
	children: any
}) => {
	const height = useHeaderHeight()

	return (
		<KeyboardAvoidingView
			keyboardVerticalOffset={height + 10 + (offset ? offset : 0)}
			style={{
				flex: 1,
				height: "100%",
				...{
					...(margin && {
						marginTop: margin.top,
						marginLeft: margin.left,
						marginRight: margin.right,
						marginBottom: margin.bottom
					})
				}
			}}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
		>
			{children}
		</KeyboardAvoidingView>
	)
}

const Center = ({
	margin,
	height,
	children
}: {
	margin?: {
		top?: number
		left?: number
		right?: number
		bottom?: number
	}
	height?: number
	children: any
}) => {
	return (
		<View
			style={{
				height: height ? height : 100,
				...{
					...(margin && {
						marginTop: margin.top,
						marginLeft: margin.left,
						marginRight: margin.right,
						marginBottom: margin.bottom
					})
				},
				justifyContent: "center",
				alignItems: "center"
			}}
		>
			{children}
		</View>
	)
}

export { Layout, Fill, KeyboardLayout, Center }

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.offWhite,
		flex: 1,
		height: "100%"
	},
	center: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	}
})