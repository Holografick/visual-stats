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
    data: any = {};

    constructor(
        private mapService: MapService,
        private http: HttpClient
    ){}

    // Just for demo now
    // TODO: get data for each district and draw on map
    getAndDraw(){
        this.http.get('/assets/district_names.json')
            .subscribe( (districts: any) => {
                districts.forEach( (districtName: any) => {
                    this.http.get(`/assets/districts/${districtName}.json`)
                        .subscribe( (district: any) => {
                            let border = district.border.map( item => [item[1], item[0]])
                            this.mapService.addPolygon('bd-districts', district.name, border)

                            let density = district.stats.population/district.stats.area;
                            let markup = `
                                <h2 style="margin: 0">${district.name}</h2><br>
                                <b>Population: </b>${district.stats.population.toFixed(2).toLocaleString()}<br>
                                <b>Area: </b>${district.stats.area.toFixed(2).toLocaleString()} km<sup>2</sup><br>
                                <b>Density: </b>${density.toFixed(2).toLocaleString()}/km<sup>2</sup><br>
                            `
                            this.mapService.attachPopup('bd-districts', district.name, markup)
                        })
                })
            })
    }
}
