import { Box, Loader } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { FunctionComponent } from 'react';
import { weatherQuery } from './api/queries';

export const Content: FunctionComponent = () => {
    const { data, isLoading, isError } = useQuery(weatherQuery)

    return (
        <Box
            pos="relative"
            w="100%"
            h="100%"
        >
            {isLoading && (
                <Loader />
            )}

            {isError && (
                <p>
                    ERROR
                </p>
            )}

            {data?.map(weather => (
                <p>
                    {weather.date}
                    :
                    {' '}
                    {weather.summary}
                </p>
            ))}
        </Box>
    );
};
