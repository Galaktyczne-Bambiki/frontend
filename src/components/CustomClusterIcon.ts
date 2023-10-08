import { MarkerCluster, divIcon, point } from 'leaflet'

export const createClusterCustomIcon = function (cluster: MarkerCluster) {
    return divIcon({
        html: `<div><span>${cluster.getChildCount()}</span></div>`,
        className: 'custom-marker-cluster marker-cluster marker-cluster-large',
        iconSize: point(40, 40, true),
    })
}
