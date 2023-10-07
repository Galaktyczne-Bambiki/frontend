import { queryOptions } from '@tanstack/react-query';
import { apiClient } from './client';
import { FireReportData, FireReport, FirePoint, FirePointsRequestParams, FireTracker } from './models';

export const fireReportsQuery = queryOptions({
    queryKey: ['fireReports', 'all'],
    queryFn: () => apiClient.get('fire-reports/all').json<Array<FireReport>>(),
    refetchInterval: 60_000
})

export const firePointsQuery = (searchParams: FirePointsRequestParams) => queryOptions({
    queryKey: ['firePoints', searchParams],
    queryFn: () => apiClient.get('fire-points', { searchParams }).json<Array<FirePoint>>(),
    refetchInterval: 60_000
})

export const fireTrackersQuery = (date: string) => queryOptions({
    queryKey: ['fireTrackers', { date }],
    queryFn: () => apiClient.get('temperature-reports/max', { searchParams: { date } }).json<Array<FireTracker>>(),
    refetchInterval: 60_000
})

export const reportMutation = ({
    mutationFn: ({ data, file } : FireReportData) => {
        const formData = new FormData();
        formData.append('File', file);
        formData.append('Details.Description', data.description ?? '')
        formData.append('Details.Latitude', data.lat?.toString() ?? '')
        formData.append('Details.Longitude', data.lng?.toString() ?? '')

        return apiClient
            .post('fire-reports/add-report', { body: formData })
            .json<void>()
            .catch(async error => {
                throw await error.response.json()
            })
    }
})
