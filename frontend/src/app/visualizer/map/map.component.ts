import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MapService } from '../map.service'
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
    @Input('mapId') mapId: string;
    @Input('centerPoint') centerPoint: any;
    @Input('initialZoom') initialZoom: number;

    @Output() initializeEvent: EventEmitter<any> = new EventEmitter();

    theMap: any;
    initialized: boolean = false;

    constructor(private mapService: MapService) { }

    ngOnInit() {
        this.mapService.addMap(this.mapId, this)
    }

    ngOnDestroy() {
        this.mapService.removeMap(this.mapId)
    }

    ngAfterViewInit() {
        this.initMap();
    }

    private initMap():void{
        this.theMap = L.map(this.mapId, {
            center: this.centerPoint,
            zoom: this.initialZoom
        })

        const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        });

        tiles.addTo(this.theMap);

        this.initialized = true;
        this.initializeEvent.emit()
    }

}
