import { queryOptions } from '@tanstack/react-query';
import { apiClient } from './client';
import { FireReportData, WeatherEntry } from './models';

export const weatherQuery = queryOptions({
    queryKey: ['weather'],
    queryFn: () => apiClient.post('WeatherForecast', {
    }).json<Array<WeatherEntry>>()
})

export const reportMutation = ({
    mutationFn: ({ data, file } : FireReportData) => {
        const formData = new FormData();
        formData.append('File', file);
        formData.append('Details.Description', data.description ?? '')
        formData.append('Details.Latitude', data.lat?.toString() ?? '')
        formData.append('Details.Longitude', data.lng?.toString() ?? '')
        return apiClient.post('fire-reports/add-report', { body: formData
        }).json<void>().catch(async error => {
            throw await error.response.json()
        })
    }
})
