import { Icon } from 'leaflet';
import { FunctionComponent, useState } from 'react';
import { useMapEvent, Marker } from 'react-leaflet';
import fireIcon from '../assets/fireMarker.svg'

type FireReport = {
	id: string,
	lat: number,
	lng: number,
}

export const FireMarkers: FunctionComponent = () => {
    const [fireReports, setFireReports] = useState<Array<FireReport>>([]);

    useMapEvent('click', event => {
        setFireReports(prev => prev.concat({
            id: crypto.randomUUID(),
            lat: event.latlng.lat,
            lng: event.latlng.lng
        }))
    })
    return (
        <>
            {fireReports.map(({ id, lat, lng }) => (
                <Marker
                    key={id}
                    position={{
                        lat, lng
                    }}
                    icon={new Icon({
                        iconUrl: fireIcon,
                        iconAnchor: [16, 16]
                    })}

                />
            ))}
        </>
    );
};
