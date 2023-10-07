export type FireReport = {
	fireReportId: number,
	description: string,
	latitude: number,
	longitude: number,
}

export type FireReportRequest = {
	description?: string,
	lat?: number,
	lng?: number,
}

export type FireReportData = {data: FireReportRequest, file: File}
