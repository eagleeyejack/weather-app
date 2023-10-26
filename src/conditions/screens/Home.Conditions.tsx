import React from "react"

import { Fill, KeyboardLayout, Layout } from "../../shared/components/UI/Layout"
import { useSearch } from "../../shared/context/Search.Context"
import { spacing } from "../../shared/theme"
import WeatherOverview from "../components/WeatherOverview"

function ConditionsHomeScreen() {
	const { search } = useSearch()

	return (
		<Layout>
			<Fill
				margin={{
					top: spacing.sm
				}}
			>
				{search.currentLocation.searchQuery ? (
					<WeatherOverview location={search.currentLocation.searchQuery} />
				) : null}
			</Fill>
		</Layout>
	)
}

export default ConditionsHomeScreen
