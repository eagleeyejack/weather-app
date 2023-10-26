import React, { ReactNode, createContext, useContext, useEffect, useState } from "react"

import * as Location from "expo-location"

interface SearchContextProps {
	search: {
		currentLocation: {
			name: string
			searchQuery: string
		} | null
		locations: any[]
	}
	setSearch: {
		locations: React.Dispatch<React.SetStateAction<any[]>>
		currentLocation: React.Dispatch<
			React.SetStateAction<{
				name: string
				searchQuery: string
			} | null>
		>
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
	>([
		{
			name: "Cardiff",
			searchQuery: "Cardiff"
		}
	])

	const [canAskAgain, setCanAskAgain] = useState<boolean>(null)
	const [status, setStatus] = useState<Location.PermissionStatus | null>(null)

	const [currentLocation, setCurrentLocation] = useState<{
		name: string
		searchQuery: string
	} | null>({
		name: "Current Location",
		searchQuery: ""
	})

	/* 
	https://github.com/expo/expo/issues/19047 

	Seems to be an issue with requesting permission in the app, 
	have opted to route the user to settings.
	
	*/
	async function requestLocationPermissions() {
		let { status, canAskAgain: deviceCanAskAgain } =
			await Location.requestForegroundPermissionsAsync()

		setCanAskAgain(deviceCanAskAgain)
		setStatus(status)

		if (status !== "granted") {
			return null
		}

		let location = await Location.getCurrentPositionAsync({})

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

	return (
		<SearchContext.Provider
			value={{
				search: {
					currentLocation: currentLocation,
					locations: locations
				},
				setSearch: {
					currentLocation: setCurrentLocation,
					locations: setLocations
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
