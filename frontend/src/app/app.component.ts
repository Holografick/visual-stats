import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
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
                forkJoin(districts.map( (districtName: any) => {
                        return this.http.get(`/assets/districts/${districtName}.json`)
                    })
                ).subscribe( (data: any) => {
                    data.forEach( district => district.density = district.stats.population/district.stats.area)
                    let maxDensity = Math.max(...data.map( d => d.density ))

                    data.forEach( (district: any) => {
                        let border = district.border.map( item => [item[1], item[0]])
                        let color = this.getColor(district.density/maxDensity);
                        let conf = {
                            fillColor: color,
                            fillOpacity: 0.9,
                            color: 'grey',
                            weight: 1
                        }
                        let hoverConf = {
                            fillColor: color,
                            fillOpacity: 0.5,
                            color: 'black',
                            weight: 1
                        }

                        let polygon = this.mapService.addPolygon('bd-districts', district.name, border, conf)

                        let markup = `
                            <h2 style="margin: 0">${district.name}</h2><br>
                            <b>Population: </b>${district.stats.population.toFixed(2).toLocaleString()}<br>
                            <b>Area: </b>${district.stats.area.toFixed(2).toLocaleString()} km<sup>2</sup><br>
                            <b>Density: </b>${district.density.toFixed(2).toLocaleString()}/km<sup>2</sup><br>
                        `
                        this.mapService.attachPopup('bd-districts', district.name, markup)

                        polygon.on('mouseover', (event) => {
                            polygon.setStyle(hoverConf)
                            polygon.openPopup();
                        })
                        polygon.on('mouseout', (event) => {
                            polygon.setStyle(conf)
                            polygon.closePopup();
                        })
                    })
                })
            })
    }


    getColor(intensity){
        let decrease = intensity*200;
        return `rgb(${250 - decrease}, ${210 - decrease}, ${210 - decrease})`
    }
}
