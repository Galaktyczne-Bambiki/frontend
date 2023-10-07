export type WeatherEntry = {
	date: string,
	temperatureC: number,
	temperatureF: number,
	summary: string,
}

export type FireReportRequest = {
	description?: string,
	lat?: number,
	lng?: number,
}

export type FireReportData = {data: FireReportRequest, file: File}
