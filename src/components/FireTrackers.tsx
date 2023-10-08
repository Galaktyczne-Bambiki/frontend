import { LoadingOverlay } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { format, fromUnixTime } from 'date-fns';
import { Icon } from 'leaflet';
import { FunctionComponent } from 'react';
import { Marker } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster'
import { createClusterCustomIcon } from './CustomClusterIcon';
import { fireTrackersQuery } from '../api/queries';
import fireIcon from '../assets/fireTrackerMarker.svg'

type FireTrackersProps = {
	date: number,
}

export const FireTrackers: FunctionComponent<FireTrackersProps> = ({ date }) => {
    const fireTrackers = useQuery(fireTrackersQuery(format(fromUnixTime(date), 'yyyy-MM-dd')));

    return (
        <>
            <LoadingOverlay visible={fireTrackers.isLoading} />
            <MarkerClusterGroup
                chunkedLoading
                showCoverageOnHover
                iconCreateFunction={createClusterCustomIcon}
            >
                {fireTrackers.data?.map(({ celsiusValue, latitude, longitude }, index) => (
                    <Marker
                        key={index}
                        position={{
                            lat: latitude,
                            lng: longitude
                        }}
                        icon={new Icon({
                            iconUrl: fireIcon,
                            iconAnchor: [16, 16]
                        })}
                        title={`Measured temperature: ${celsiusValue}°C`}
                    />
                ))}
            </MarkerClusterGroup>
        </>
    );
};
