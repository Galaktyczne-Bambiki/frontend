import { queryOptions } from '@tanstack/react-query';
import { apiClient } from './client';
import { FireReport } from './models';

export const fireReportsQuery = queryOptions({
    queryKey: ['fireReports', 'all'],
    queryFn: () => apiClient.get('fire-reports/all').json<Array<FireReport>>()
})
