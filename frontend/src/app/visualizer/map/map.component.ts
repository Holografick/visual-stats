import { Component, OnInit, Input } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
    @Input('mapId') mapId:string;
    @Input('centerPoint') centerPoint:any;
    @Input('initialZoom') initialZoom:number;

    theMap:any;

    constructor() { }

    ngOnInit() {
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
    }

}
