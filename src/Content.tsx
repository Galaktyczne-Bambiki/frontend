import 'proj4leaflet'
import { format } from 'date-fns';
import { CRS, Proj, bounds, point } from 'leaflet';
import { FunctionComponent } from 'react';
import { LayersControl, MapContainer, TileLayer, WMSTileLayer } from 'react-leaflet';
import styles from './Content.module.css'

export const Content: FunctionComponent = () => {
    const date = new Date()

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
        <MapContainer
            center={[0, 0]}
            zoom={0}
            maxZoom={8}
            minZoom={2}
            crs={my_EPSG_4326}
            className={styles.content}
            bounceAtZoomLimits
            bounds={[[-180, -90], [180, 90]]}
        >
            <LayersControl position="topright">
                <LayersControl.Overlay
                    checked
                    name="Terrain"
                >
                    <TileLayer
                        url={`https://gibs-{s}.earthdata.nasa.gov/wmts/epsg4326/best/MODIS_Terra_CorrectedReflectance_TrueColor/default/${format(date, 'yyyy-MM-dd')}/250m/{z}/{y}/{x}.jpg`}
                        subdomains="abc"
                        tileSize={512}
                    />
                </LayersControl.Overlay>
                <LayersControl.Overlay
                    checked
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
                    checked
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
                            TIME: format(date, 'yyyy-MM-dd\'T00:00:00Z')
                        }).toString().replaceAll('%7B', '{').replaceAll('%7D', '}')}`}
                        subdomains="abc"
                        tileSize={512}
                    />
                </LayersControl.Overlay>
                <LayersControl.Overlay
                    name="Labels"
                    checked
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
                            TIME: format(date, 'yyyy-MM-dd\'T00:00:00Z')
                        }).toString().replaceAll('%7B', '{').replaceAll('%7D', '}')}`}
                        subdomains="abc"
                        tileSize={512}
                    />
                </LayersControl.Overlay>
            </LayersControl>
        </MapContainer>
    );
};
