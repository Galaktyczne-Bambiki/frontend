import { Control, DomUtil } from 'leaflet';
import { FunctionComponent, useEffect } from 'react';
import { useMap } from 'react-leaflet'
import styles from './MapLegend.module.css'
import fireMarkerIcon from '../assets/fireMarker.svg'
import fireHighIcon from '../assets/firePointHighMarker.svg'
import fireLowIcon from '../assets/firePointLowMarker.svg'
import fireNominalIcon from '../assets/firePointNominalMarker.svg'
import fireTrackerIcon from '../assets/fireTrackerMarker.svg'

export const MapLegend: FunctionComponent = () => {
    const map = useMap()

    useEffect(() => {
        const legend = new Control({ position: 'bottomleft' });

        legend.onAdd = () => {
            const div = DomUtil.create('div', styles.legend);
            div.innerHTML = `
				<h2>Legend</h2>
				<div class="${styles.legendItems}">
					<div class="${styles.legendItem}"><img class="${styles.legendIcon}" src="${fireHighIcon}" /><span>High confidence fire</span></div>
					<div class="${styles.legendItem}"><img class="${styles.legendIcon}" src="${fireNominalIcon}" /><span>Nominal confidence fire</span></div>
					<div class="${styles.legendItem}"><img class="${styles.legendIcon}" src="${fireLowIcon}" /><span>Low confidence fire</span></div>
					<div class="${styles.legendItem}"><img class="${styles.legendIcon}" src="${fireTrackerIcon}" /><span>FireTracker report</span></div>
					<div class="${styles.legendItem}"><img class="${styles.legendIcon}" src="${fireMarkerIcon}" /><span>User fire report</span></div>
				</div>
			`;

            return div;
        };

        legend.addTo(map);

        return () => {
            legend.remove();
        };
    }, [map]);

    return null;
}
