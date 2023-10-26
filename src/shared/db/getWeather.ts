export async function getWeather(location: string) {
	const response = await fetch(
		`https://api.weatherapi.com/v1/current.json?key=7e7392b5aa01484f83d85604232610&q=${location}&aqi=no`
	)
	const data = await response.json()
	return data
}
