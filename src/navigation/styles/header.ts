import { NativeStackNavigationOptions } from "@react-navigation/native-stack"

import { colors } from "../../shared/theme"

export const baseHeaderOptions: NativeStackNavigationOptions = {
	headerStyle: {
		backgroundColor: colors.offWhite
	},
	headerTintColor: colors.primary,
	headerTitleStyle: {
		fontSize: 18
	}
}
