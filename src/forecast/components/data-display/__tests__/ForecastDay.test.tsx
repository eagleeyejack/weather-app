import React from "react"

import { create } from "react-test-renderer"

import ForecastDay from "../ForecastDay"

describe("ForecastDay Component", () => {
	it("renders correctly with data", () => {
		const data = {
			date: "2023-10-27",
			day: {
				maxtemp_c: 25,
				mintemp_c: 15,
				condition: {
					icon: "https://example.com/icon.png",
					text: "Sunny"
				},
				uv: 5
			},
			astro: {
				sunrise: "06:30 AM",
				sunset: "06:00 PM"
			}
		}

		const component = create(<ForecastDay data={data} />)

		expect(component.toJSON()).toMatchSnapshot()
	})

	it("renders <ActivityIndicator /> when there is no data", () => {
		const component = create(<ForecastDay data={null} />)
		const activityIndicator = component.root.findByType("ActivityIndicator")

		expect(activityIndicator).toBeTruthy()
	})
})
