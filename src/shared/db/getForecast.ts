export async function getForecast(location: string) {
	const response = await fetch(
		`https://api.weatherapi.com/v1/forecast.json?key=7e7392b5aa01484f83d85604232610&q=${location}&days=5&aqi=no&alerts=no`
	)

	const responseJson = await response.json()

	if (!response.ok) {
		throw new Error(responseJson.error.message)
	}

	return responseJson
}
