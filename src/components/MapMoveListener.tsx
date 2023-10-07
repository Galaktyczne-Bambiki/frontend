import { LatLngBounds } from 'leaflet'
import { FunctionComponent } from 'react';
import { useMapEvent } from 'react-leaflet'

type MapMoveListenerProps = {
	onBoundsChange(bounds: LatLngBounds): void,
}

export const MapMoveListener: FunctionComponent<MapMoveListenerProps> = ({ onBoundsChange }) => {
    const map = useMapEvent('moveend', () => {
        onBoundsChange(map.getBounds())
    })

    return null;
};
