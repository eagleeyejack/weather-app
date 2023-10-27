import React, { ReactNode, createContext, useContext, useEffect, useState } from "react"

import AsyncStorage from "@react-native-async-storage/async-storage"
import * as Location from "expo-location"

import { getDataAsyncStorage } from "../utils"

interface ILocation {
	name: string
	searchQuery: string
}

/* 
	Should these context providers be split up into their own files? 
*/

interface SearchContextProps {
	search: {
		currentLocation: ILocation | null
		set: React.Dispatch<
			React.SetStateAction<{
				name: string
				searchQuery: string
			} | null>
		>
	}
	locations: {
		data: ILocation[]
		set: (locs: ILocation[]) => Promise<void>
		remove: (location: ILocation) => Promise<void>
	}
	permissions: {
		requestLocation: () => Promise<Location.LocationObject | null>
		canAskAgain: boolean
		status: Location.PermissionStatus | null
	}
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined)

export function useSearch(): SearchContextProps {
	const context = useContext(SearchContext)
	if (!context) {
		throw new Error("useSearch must be used within a SearchProvider")
	}
	return context
}

interface SearchProviderProps {
	children: ReactNode
}

export function SearchProvider({ children }: SearchProviderProps) {
	const [locations, setLocations] = useState<
		{
			name: string
			searchQuery: string
		}[]
	>([])

	const [canAskAgain, setCanAskAgain] = useState<boolean>(null)
	const [status, setStatus] = useState<Location.PermissionStatus | null>(null)

	const [currentLocation, setCurrentLocation] = useState<{
		name: string
		searchQuery: string
	} | null>({
		name: "Current Location",
		searchQuery: ""
	})

	useEffect(() => {
		;(async () => {
			const locations = await getDataAsyncStorage({ key: "locations" })

			if (locations) {
				setLocations(locations)
			}
		})()
	}, [])

	/* 
		https://github.com/expo/expo/issues/19047 

		Seems to be an issue with requesting permission in the app, 
		have opted to route the user to settings with less than optimal UX of having to 'reset' the app.
	
	*/
	async function requestLocationPermissions() {
		const { status, canAskAgain: deviceCanAskAgain } =
			await Location.requestForegroundPermissionsAsync()

		setCanAskAgain(deviceCanAskAgain)
		setStatus(status)

		if (status !== "granted") {
			return null
		}

		const location = await Location.getCurrentPositionAsync({})

		return location
	}

	useEffect(() => {
		;(async () => {
			const loc = await requestLocationPermissions()

			if (!loc) {
				return
			}

			setCurrentLocation({
				name: "Current Location",
				searchQuery: `${loc.coords.latitude},${loc.coords.longitude}`
			})
		})()
	}, [])

	/*
		Using AsyncStorage to save locations vs a database for ease of implementation.
		
		One approach could have been creating a User table, wrapping the application with an Auth Higher-order component.
		Once the user signs in, then show the app and allow the user to write to a Locations table that has a one to many (user -> locations) relationship. 

		If signed in, fetch existing locations.
	*/

	async function handleSaveLocations(locs: ILocation[]) {
		setLocations(locs)
		// save locations to async storage
		await AsyncStorage.setItem("locations", JSON.stringify(locs))
	}

	async function handleRemoveLocation(location: ILocation) {
		const newLocations = locations.filter((loc) => loc.searchQuery !== location.searchQuery)

		setLocations(newLocations)

		await AsyncStorage.setItem("locations", JSON.stringify(newLocations))
	}

	return (
		<SearchContext.Provider
			value={{
				search: {
					currentLocation: currentLocation,
					set: setCurrentLocation
				},
				locations: {
					data: locations,
					set: handleSaveLocations,
					remove: handleRemoveLocation
				},
				permissions: {
					requestLocation: requestLocationPermissions,
					canAskAgain: canAskAgain,
					status: status
				}
			}}
		>
			{children}
		</SearchContext.Provider>
	)
}
