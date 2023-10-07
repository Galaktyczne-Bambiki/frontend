import { format } from 'date-fns';
import { CRS } from 'leaflet';
import { FunctionComponent } from 'react';
import { MapContainer, TileLayer, WMSTileLayer } from 'react-leaflet';
import styles from './Content.module.css'

export const Content: FunctionComponent = () => {
    const layer = 'MODIS_Terra_CorrectedReflectance_TrueColor'

    return (
        <MapContainer
            center={[0, 0]}
            zoom={2}
            maxZoom={8}
            crs={CRS.EPSG4326}
            maxBounds={[
                [-120, -220],
                [120, 220]
            ]}
            className={styles.content}
        >
            <TileLayer
                url={`https://gibs-{s}.earthdata.nasa.gov/wmts/epsg4326/best/${layer}/default/${format(new Date(), 'yyyy-MM-dd')}/250m/{z}/{y}/{x}.jpg`}
                bounds={[
                    [-89.9999, -179.9999],
                    [89.9999, 179.9999]
                ]}
                subdomains="abc"
                tileSize={512}
                noWrap
            />
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
        </MapContainer>
    );
};
