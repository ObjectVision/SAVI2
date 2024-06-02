import { Component } from '@angular/core';
import {Map, StyleSpecification} from 'maplibre-gl';

@Component({
  selector: 'app-simple-map',
  standalone: true,
  imports: [],
  templateUrl: './simple-map.component.html',
  styleUrl: './simple-map.component.css'
})
export class SimpleMapComponent {

  map : Map | undefined;
  lng: number =  4.895281025449475;
  lat: number = 52.3748673716883;

  style:StyleSpecification = {
    "version": 8,
    "sources": {
      "osm": {
        "type": "raster",
        "tiles": ["https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"],
        "tileSize": 256,
        "attribution": "&copy; OpenStreetMap Contributors",
        "maxzoom": 19
      }
    },
    "layers": [
      {
        "id": "osm",
        "type": "raster",
        "source": "osm" // This must match the source key above
      }
    ]
  };

  ngOnInit() {
    this.map = new Map({
      container: 'map',
      style: this.style,
      center: [1, 15],
      zoom: 3
    });

    

  }
}
