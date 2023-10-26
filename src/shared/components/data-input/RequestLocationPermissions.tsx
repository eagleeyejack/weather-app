import { Linking, View } from "react-native"

import { useSearch } from "../../context/Search.Context"
import { spacing } from "../../theme"
import Text from "../data-display/Text"
import { Button } from "./Button"

const RequestLocationPermissions = () => {
	const { permissions } = useSearch()

	return (
		<View>
			<Text
				style={{
					marginBottom: spacing.sm
				}}
			>
				Allow location permissions to see your current weather. You may need to restart your app
				after approving permissions.
			</Text>

			<Button
				label={permissions.canAskAgain ? "Allow location" : "Go to settings"}
				onPress={async () => {
					if (!permissions.canAskAgain) {
						Linking.openSettings()
					} else {
						await permissions.requestLocation()
					}
				}}
			/>
		</View>
	)
}
export default RequestLocationPermissions
