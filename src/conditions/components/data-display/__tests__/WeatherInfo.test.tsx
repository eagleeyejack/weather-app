import React from "react"

import { create } from "react-test-renderer"

import WeatherInfo from "../WeatherInfo"

describe("WeatherInfo Component", () => {
	it("renders correctly with data", () => {
		const data = {
			location: {
				name: "Test City",
				country: "Test Country"
			},
			current: {
				temp_c: 25,
				condition: {
					icon: "https://example.com/icon.png",
					text: "Sunny"
				}
			}
		}

		const component = create(<WeatherInfo data={data} />)

		const rootInstance = component.root

		// Check the location text content
		const locationTextElement = rootInstance.findByProps({ testID: "location" })
		const locationText = locationTextElement.props.children.join("")

		expect(locationText).toBe("Test City, Test Country")

		expect(rootInstance.findByProps({ testID: "weather-condition" }).props.children).toBe("Sunny")

		// Check the temperature text content
		const temperatureTextElement = rootInstance.findByProps({ testID: "temperature" })
		const temperatureText = temperatureTextElement.props.children.join("")

		expect(temperatureText).toBe("25°C")

		expect(component.toJSON()).toMatchSnapshot()
	})

	it("renders loading indicator when there is no data", () => {
		const component = create(<WeatherInfo data={null} />)
		const activityIndicator = component.root.findByType("ActivityIndicator")

		expect(activityIndicator).toBeTruthy()
	})
})
