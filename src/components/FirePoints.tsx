import { LoadingOverlay, Text } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { format, fromUnixTime } from 'date-fns';
import { Icon, LatLngBounds } from 'leaflet';
import { FunctionComponent, useState } from 'react';
import { Marker, useMapEvent, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster'
import { createClusterCustomIcon } from './CustomClusterIcon';
import { FirePoint } from '../api/models';
import { firePointsQuery } from '../api/queries';
import fireHighIcon from '../assets/firePointHighMarker.svg'
import fireLowIcon from '../assets/firePointLowMarker.svg'
import fireNominalIcon from '../assets/firePointNominalMarker.svg'

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

    const getMarkerIcon = (confidence: FirePoint['confidence']) => {
        switch (confidence) {
        case 'Low':return fireLowIcon
        case 'Nominal':return fireNominalIcon
        case 'High':return fireHighIcon
        }
    }

    return (
        <>
            <LoadingOverlay visible={firePoints.isLoading} />
            <MarkerClusterGroup
                chunkedLoading
                showCoverageOnHover
                iconCreateFunction={createClusterCustomIcon}
                polygonOptions={{
                    fillColor: 'rgba(253, 156, 115)',
                    color: 'rgba(241, 128, 23)',
                    weight: 3,
                    opacity: 1,
                    fillOpacity: 0.6,
                }}
            >
                {firePoints.data?.map(({ confidence, latitude, longitude }, index) => (
                    <Marker
                        key={index}
                        position={{
                            lat: latitude,
                            lng: longitude
                        }}
                        icon={new Icon({
                            iconUrl: getMarkerIcon(confidence),
                            iconAnchor: [16, 16]
                        })}
                        title={confidence}
                    >
                        <Popup>
                            <Text>
                                Fire confidence:
                                {' '}
                                {confidence}
                            </Text>
                        </Popup>
                    </Marker>
                ))}
            </MarkerClusterGroup>
        </>
    );
};
