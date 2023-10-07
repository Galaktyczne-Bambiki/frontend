export type FireReport = {
	fireReportId: number,
	description: string,
	latitude: number,
	longitude: number,
}

export type FirePoint = {
	latitude: number,
    longitude: number,
    dateUtc: string,
    confidence: 'Low' | 'Nominal' | 'High',
}

export type FireTracker = {
	latitude: number,
    longitude: number,
    celsiusValue: number,
}

export type FirePointsRequestParams = {
	South: string,
	East: string,
	West: string,
	North: string,
	date: string,
}

export type FireReportRequest = {
	description?: string,
	lat?: number,
	lng?: number,
}

export type FireReportData = {data: FireReportRequest, file: File}
