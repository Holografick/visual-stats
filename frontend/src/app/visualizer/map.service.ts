import { Injectable } from '@angular/core';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class MapService {
    // Register of map components and their containing items - markers, polygons, popups etc
    mapRegister = {}

    constructor() { }

    addMap(mapId, component){
        this.mapRegister[mapId] = { component, elements: {} }
    }

    removeMap(mapId){
        delete this.mapRegister[mapId]
    }

    // Add map item to given mapId
    setMapItem(mapId, itemId, item){
        this.mapRegister[mapId].elements[itemId] = item;
    }

    addPolygon(mapId, polygonId, border){
        const theMap = this.mapRegister[mapId].component.theMap;
        const polygon = L.polygon(border).addTo(theMap);
        
        this.setMapItem(mapId, polygonId, polygon);
    }

    attachPopup(mapId, itemId, markup){
        const item = this.mapRegister[mapId].elements[itemId];
        item.bindPopup(markup)
    }
}
