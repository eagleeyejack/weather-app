import React from "react"
import { Text, TouchableOpacity } from "react-native"

import { create } from "react-test-renderer"

import { Button } from "../Button"

describe("Button Component", () => {
	it("renders a primary button with label", () => {
		const onPressMock = jest.fn()
		const component = create(<Button onPress={onPressMock} label="Primary Button" type="primary" />)

		expect(component.toJSON()).toMatchSnapshot()

		const touchableOpacity = component.root.findByType(TouchableOpacity)
		touchableOpacity.props.onPress()

		expect(onPressMock).toHaveBeenCalled()
	})
	it("renders a secondary button with label", () => {
		const onPressMock = jest.fn()
		const component = create(
			// Use create to render the component
			<Button onPress={onPressMock} label="Secondary Button" type="secondary" />
		)

		// Create a snapshot and make assertions about the component
		expect(component.toJSON()).toMatchSnapshot()

		// Simulate a click event
		const touchableOpacity = component.root.findByType(TouchableOpacity)
		touchableOpacity.props.onPress()

		// Assert that the onPressMock was called
		expect(onPressMock).toHaveBeenCalled()
	})

	it("renders a link button with label", () => {
		const onPressMock = jest.fn()
		const component = create(<Button onPress={onPressMock} label="Link Button" type="link" />)

		expect(component.toJSON()).toMatchSnapshot()

		const touchableOpacity = component.root.findByType(TouchableOpacity)
		touchableOpacity.props.onPress()

		expect(onPressMock).toHaveBeenCalled()
	})

	it("disables the button when loading is true", () => {
		const onPressMock = jest.fn()
		const component = create(<Button onPress={onPressMock} label="Loading Button" loading={true} />)

		expect(component.toJSON()).toMatchSnapshot()

		const touchableOpacity = component.root.findByType(TouchableOpacity)

		expect(touchableOpacity.props.disabled).toBe(true)
	})

	it("displays loading indicator and disables the button when loading is true", () => {
		const onPressMock = jest.fn()
		const component = create(<Button onPress={onPressMock} label="Loading Button" loading={true} />)

		expect(component.toJSON()).toMatchSnapshot()

		const touchableOpacity = component.root.findByType(TouchableOpacity)

		expect(touchableOpacity.props.disabled).toBe(true)
		expect(component.root.findAllByType(Text).length).toBe(0) // No text should be displayed
	})

	it("renders a custom style", () => {
		const onPressMock = jest.fn()
		const customStyle = { backgroundColor: "blue", borderColor: "red" }
		const component = create(
			<Button onPress={onPressMock} label="Custom Style Button" style={customStyle} />
		)

		expect(component.toJSON()).toMatchSnapshot()

		const touchableOpacity = component.root.findByType(TouchableOpacity)
		expect(touchableOpacity.props.style).toContain(customStyle)
	})
})
