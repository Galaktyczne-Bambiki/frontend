import { format } from 'date-fns';
import { CRS } from 'leaflet';
import { FunctionComponent } from 'react';
import { LayersControl, MapContainer, TileLayer, WMSTileLayer } from 'react-leaflet';
import styles from './Content.module.css'

export const Content: FunctionComponent = () => {
    const date = new Date()

    return (
        <MapContainer
            center={[0, 0]}
            zoom={0}
            maxZoom={8}
            crs={CRS.EPSG4326}
            maxBounds={[
                [-120, -220],
                [120, 220]
            ]}
            className={styles.content}
        >
            <LayersControl position="topright">
                <LayersControl.Overlay
                    checked
                    name="Terrain"
                >
                    <TileLayer
                        url={`https://gibs-{s}.earthdata.nasa.gov/wmts/epsg4326/best/MODIS_Terra_CorrectedReflectance_Bands367/default/${format(date, 'yyyy-MM-dd')}/250m/{z}/{y}/{x}.jpg`}
                        bounds={[
                            [-89.9999, -179.9999],
                            [89.9999, 179.9999]
                        ]}
                        subdomains="abc"
                        noWrap
                        tms
                    />
                </LayersControl.Overlay>
                <LayersControl.Overlay
                    name="Thermal anomalies"
                >
                    <WMSTileLayer
                        url="https://gibs-{s}.earthdata.nasa.gov/wms/epsg4326/best/wms.cgi"
                        subdomains="abc"
                        crs={CRS.EPSG4326}
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
                    />
                </LayersControl.Overlay>
                <LayersControl.Overlay
                    checked
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
                            TileCol: '{y}',
                            TileRow: '{x}',
                            TIME: format(date, 'yyyy-MM-dd\'T00:00:00Z')
                        }).toString().replaceAll('%7B', '{').replaceAll('%7D', '}')}`}
                        bounds={[
                            [-89.9999, -179.9999],
                            [89.9999, 179.9999]
                        ]}
                        subdomains="abc"
                        tileSize={512}
                        noWrap
                    />
                </LayersControl.Overlay>
                <LayersControl.Overlay
                    checked
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
                            TileMatrix: '2',
                            TileCol: '1',
                            TileRow: '0',
                            TIME: format(date, 'yyyy-MM-dd\'T00:00:00Z')
                        })}`}
                        bounds={[
                            [-89.9999, -179.9999],
                            [89.9999, 179.9999]
                        ]}
                        subdomains="abc"
                        tileSize={512}
                        noWrap
                    />
                </LayersControl.Overlay>
            </LayersControl>
        </MapContainer>
    );
};
