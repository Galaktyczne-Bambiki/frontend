import { LoadingOverlay } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { format, fromUnixTime } from 'date-fns';
import { Icon, LatLngBounds } from 'leaflet';
import { FunctionComponent, useState } from 'react';
import { Marker, useMapEvent } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster'
import { firePointsQuery } from '../api/queries';
import fireIcon from '../assets/fireMarker.svg'

type FirePointsProps = {
	date: number,
}

export const FirePoints: FunctionComponent<FirePointsProps> = ({ date }) => {
    const [bbox, setBbox] = useState<LatLngBounds>(new LatLngBounds([[-180, -90], [180, 90]]));
    const map = useMapEvent('moveend', () => {
        setBbox(map.getBounds())
    })
    const firePoints = useQuery(firePointsQuery({
        East: bbox.getEast().toString(),
        North: bbox.getNorth().toString(),
        South: bbox.getSouth().toString(),
        West: bbox.getWest().toString(),
        date: format(fromUnixTime(date), 'yyyy-MM-dd')
    }));

    return (
        <>
            <LoadingOverlay visible={firePoints.isLoading} />
            <MarkerClusterGroup
                chunkedLoading
                showCoverageOnHover
            >
                {firePoints.data?.map(({ confidence, latitude, longitude }, index) => (
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
                        title={confidence}
                    />
                ))}
            </MarkerClusterGroup>
        </>
    );
};
