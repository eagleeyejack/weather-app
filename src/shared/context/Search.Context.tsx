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

	const [currentLocation, setCurrentLocation] = useState<{
		name: string
		searchQuery: string
	} | null>({
		name: "Current Location",
		searchQuery: ""
	})

	useEffect(() => {
		;(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync()
			if (status !== "granted") {
				// setErrorMsg("Permission to access location was denied")
				return
			}

			let location = await Location.getCurrentPositionAsync({})

			setCurrentLocation({
				name: "Current Location",
				searchQuery: `${location.coords.latitude},${location.coords.longitude}`
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
				}
			}}
		>
			{children}
		</SearchContext.Provider>
	)
}
