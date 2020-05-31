import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MapService } from './visualizer/map.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'frontend';
    mapCenter = [ 23.4550, 90.2320 ]
    data;

    constructor(
        private mapService: MapService,
        private http: HttpClient
    ){}

    // Just for demo now
    // TODO: get data for each district and draw on map
    getAndDraw(){
            this.http.get(
                'https://nominatim.openstreetmap.org/search?country=bangladesh&state=dhaka&county=dhaka&polygon_geojson=1&format=json'
            ).subscribe( (data) => {
                this.data = data[0].geojson.coordinates[0];
                let border = this.data.map( item => [item[1], item[0]])
                this.mapService.addPolygon('bd-districts', 'dhaka', border)
            })
    }
}
