import { queryOptions } from '@tanstack/react-query';
import { apiClient } from './client';
import { WeatherEntry } from './models';

export const weatherQuery = queryOptions({
    queryKey: ['weather'],
    queryFn: () => apiClient.get('WeatherForecast').json<Array<WeatherEntry>>()
})
