import React, { useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

import { useQuery } from "@tanstack/react-query"
import Toast from "react-native-toast-message"

import { SearchStackParamsList } from "../../navigation/Search.Stack"
import { SearchRoutes } from "../../navigation/routes"
import { Fill, KeyboardLayout, Layout } from "../../shared/components/UI/Layout"
import { Button } from "../../shared/components/data-input/Button"
import TextInput from "../../shared/components/data-input/TextInput"
import { useSearch } from "../../shared/context/Search.Context"
import { getWeather } from "../../shared/db/getWeather"
import { colors, spacing } from "../../shared/theme"

function SearchHomeScreen() {
	const navigation = useNavigation<NativeStackNavigationProp<SearchStackParamsList>>()

	const { search, setSearch } = useSearch()

	const [locationString, setLocationString] = useState("")

	const { isLoading, refetch } = useQuery({
		queryKey: ["weather", locationString],
		queryFn: async () => {
			try {
				const res = await getWeather(locationString)

				setSearch.locations([
					...search.locations,

					{
						name: locationString,
						searchQuery: locationString
					}
				])
				setLocationString("")

				navigation.navigate(SearchRoutes.LOCATION, {
					location: locationString
				})

				return res
			} catch (error) {
				Toast.show({
					type: "error",
					text1: "Error",
					text2: error,
					autoHide: false
				})
			}

			return null
		},
		enabled: false
	})

	async function onSearch() {
		await refetch()
	}

	return (
		<Layout>
			<KeyboardLayout>
				<Fill
					margin={{
						top: spacing.sm
					}}
				>
					<View style={styles.searchWrapper}>
						<TextInput
							value={locationString}
							onChange={setLocationString}
							label="Enter a location"
						/>
						<Button
							label="Search"
							onPress={() => onSearch()}
							loading={isLoading}
							disabled={locationString.length === 0 || isLoading}
						/>
					</View>
					<View>
						<Text style={styles.title}>Saved Searches</Text>
					</View>
					{search.locations?.map((location) => {
						return (
							<TouchableOpacity
								key={location.searchQuery}
								style={styles.card}
								onPress={() => {
									navigation.navigate(SearchRoutes.LOCATION, {
										location: location?.searchQuery
									})
								}}
							>
								<Text>{location.name}</Text>
							</TouchableOpacity>
						)
					})}
				</Fill>
			</KeyboardLayout>
		</Layout>
	)
}

export default SearchHomeScreen

const styles = StyleSheet.create({
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: spacing.sm
	},
	searchWrapper: {
		marginBottom: spacing.sm
	},
	card: {
		backgroundColor: colors.white,
		borderRadius: 10,
		marginBottom: spacing.sm,
		padding: spacing.sm
	}
})
