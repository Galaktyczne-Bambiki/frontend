import { LoadingOverlay, Text } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { Icon } from 'leaflet';
import { FunctionComponent } from 'react';
import { Popup, Marker } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster'
import { createClusterCustomIcon } from './CustomClusterIcon';
import styles from './FireMarkers.module.css'
import { fireReportsQuery } from '../api/queries';
import fireIcon from '../assets/fireMarker.svg'

export const FireMarkers: FunctionComponent = () => {
    const fireReports = useQuery(fireReportsQuery);

    return (
        <>
            <LoadingOverlay visible={fireReports.isLoading} />
            <MarkerClusterGroup
                chunkedLoading
                showCoverageOnHover
                iconCreateFunction={createClusterCustomIcon}
            >
                {fireReports.data?.map(({ description, fireReportId, latitude, longitude }) => (
                    <Marker
                        key={fireReportId}
                        position={{
                            lat: latitude,
                            lng: longitude
                        }}
                        icon={new Icon({
                            iconUrl: fireIcon,
                            iconAnchor: [16, 16]
                        })}
                        title={description}
                    >
                        <Popup>
                            <img
                                src={`${import.meta.env.VITE_API_URL}/fire-reports/${fireReportId}/image`}
                                alt={description}
                                className={styles.image}
                            />
                            {description && (
                                <Text>
                                    {description}
                                </Text>
                            )}
                        </Popup>
                    </Marker>
                ))}
            </MarkerClusterGroup>
        </>
    );
};
