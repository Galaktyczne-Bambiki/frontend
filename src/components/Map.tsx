import 'proj4leaflet'
import { List, LoadingOverlay, NavLink, Slider, Text } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { format, getUnixTime, subMonths, fromUnixTime } from 'date-fns';
import { Proj, bounds, point, Map as MapType, LatLng } from 'leaflet';
import { FunctionComponent, useRef, useState } from 'react';
import { LayersControl, MapContainer, TileLayer, WMSTileLayer } from 'react-leaflet';
import { FireMarkers } from './FireMarkers';
import styles from './Map.module.css'
import { fireReportsQuery } from '../api/queries';
import FireMarkerIcon from '../assets/fireMarker.svg?react'

export const Map: FunctionComponent = () => {
    const [date, setDate] = useState(getUnixTime(new Date()));
    const fireReports = useQuery(fireReportsQuery);
    const mapRef = useRef<MapType>(null)

    const my_EPSG_4326 = new Proj.CRS(
        'EPSG:4326',
        '+proj=longlat +datum=WGS84 +no_defs +type=crs', {
            origin: [-180, 90],
            resolutions: [
                0.5625,
                0.28125,
                0.140625,
                0.0703125,
                0.03515625,
                0.017578125,
                0.0087890625,
                0.00439453125,
                0.002197265625
            ],
            bounds: bounds(
                point(-180, -90),
                point(180, 90)
            )
        }
    );

    return (
        <div className={styles.wrapper}>
            <div className={styles.mapContainerWrapper}>
                <MapContainer
                    center={[0, 0]}
                    zoom={0}
                    maxZoom={15}
                    minZoom={2}
                    // crs={my_EPSG_4326}
                    className={styles.mapContainer}
                    bounceAtZoomLimits
                    bounds={[[-180, -90], [180, 90]]}
                    ref={mapRef}
                >
                    <FireMarkers />
                    <LayersControl position="topright">
                        <LayersControl.Overlay
                            checked
                            name="New overlay"
                        >
                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        </LayersControl.Overlay>
                        <LayersControl.Overlay
                            name="Terrain"
                        >
                            <TileLayer
                                url={`https://gibs-{s}.earthdata.nasa.gov/wmts/epsg4326/best/MODIS_Terra_CorrectedReflectance_TrueColor/default/${format(fromUnixTime(date), 'yyyy-MM-dd')}/250m/{z}/{y}/{x}.jpg`}
                                subdomains="abc"
                                tileSize={512}
                            />
                        </LayersControl.Overlay>
                        <LayersControl.Overlay
                            name="Thermal anomalies"
                        >
                            <WMSTileLayer
                                url="https://gibs-{s}.earthdata.nasa.gov/wms/epsg4326/best/wms.cgi"
                                subdomains="abc"
                                crs={my_EPSG_4326}
                                params={{
                                    version: '1.1.1',
                                    layers: 'MODIS_Terra_Thermal_Anomalies_All',
                                    transparent: true,
                                    format: 'image/png',
                                    request: 'GetMap',
                                    service: 'WMS',
                                    width: 512,
                                    height: 512,
                                }}
                                tileSize={512}
                            />
                        </LayersControl.Overlay>
                        <LayersControl.Overlay
                            name="Borders"
                        >
                            <TileLayer
                                url={`https://gibs-{s}.earthdata.nasa.gov/wmts/epsg4326/best/wmts.cgi?${new URLSearchParams({
                                    layer: 'Reference_Features_15m',
                                    style: 'default',
                                    tilematrixset: '15.625m',
                                    Service: 'WMTS',
                                    Request: 'GetTile',
                                    Version: '1.0.0',
                                    Format: 'image/png',
                                    TileMatrix: '{z}',
                                    TileCol: '{x}',
                                    TileRow: '{y}',
                                    TIME: format(fromUnixTime(date), 'yyyy-MM-dd\'T00:00:00Z')
                                }).toString().replaceAll('%7B', '{').replaceAll('%7D', '}')}`}
                                subdomains="abc"
                                tileSize={512}
                            />
                        </LayersControl.Overlay>
                        <LayersControl.Overlay
                            name="Labels"
                        >
                            <TileLayer
                                url={`https://gibs-{s}.earthdata.nasa.gov/wmts/epsg4326/best/wmts.cgi?${new URLSearchParams({
                                    layer: 'Reference_Labels_15m',
                                    style: 'default',
                                    tilematrixset: '15.625m',
                                    Service: 'WMTS',
                                    Request: 'GetTile',
                                    Version: '1.0.0',
                                    Format: 'image/png',
                                    TileMatrix: '{z}',
                                    TileCol: '{x}',
                                    TileRow: '{y}',
                                    TIME: format(fromUnixTime(date), 'yyyy-MM-dd\'T00:00:00Z')
                                }).toString().replaceAll('%7B', '{').replaceAll('%7D', '}')}`}
                                subdomains="abc"
                                tileSize={512}
                            />
                        </LayersControl.Overlay>
                    </LayersControl>
                </MapContainer>
                <div className={styles.dateControlPanel}>
                    <Slider
                        min={getUnixTime(subMonths(new Date(), 1))}
                        max={getUnixTime(new Date())}
                        value={date}
                        onChange={setDate}
                        label={value => fromUnixTime(value).toISOString()}
                    />
                </div>
            </div>
            <div className={styles.reportsPane}>
                <Text
                    size="xl"
                    p={16}
                >
                    Fire reports
                </Text>
                <List className={styles.list}>
                    <LoadingOverlay visible={fireReports.isLoading} />
                    {fireReports.data?.map(report => (
                        <NavLink
                            label={report.description ?? '(no description)'}
                            leftSection={<FireMarkerIcon />}
                            onClick={() => {
                                mapRef.current?.flyTo(new LatLng(report.latitude, report.longitude), 15)
                            }}
                        />
                    ))}
                </List>
            </div>
        </div>
    );
};
