import { Component } from '@angular/core';
import {Map, StyleSpecification, Source, ImageSource} from 'maplibre-gl';

@Component({
  selector: 'app-simple-map',
  standalone: true,
  imports: [],
  templateUrl: './simple-map.component.html',
  styleUrl: './simple-map.component.css'
})

export class SimpleMapComponent {

  map : Map | undefined;
  frameCount:number = 5;
  currentImage:number = 0;
  lng: number =  4.895281025449475;
  lat: number = 52.3748673716883;

  style:StyleSpecification = { // https://codepen.io/bothness/pen/ExgwzEG
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

  getPath() {
    return (
        `https://maplibre.org/maplibre-gl-js/docs/assets/radar${
            this.currentImage
        }.gif`
    );
  }

  ngOnInit() {
    this.map = new Map({
      container: 'map',
      style: this.style,
      maxZoom: 5.99,
      minZoom: 4,
      zoom: 5,
      center: [-75.789, 41.874]
    });

    this.map.on('load', () => {
      this.map!.addSource('radar', {
        type: 'image',
        url: this.getPath(),
        coordinates: [
            [-80.425, 46.437],
            [-71.516, 46.437],
            [-71.516, 37.936],
            [-80.425, 37.936]
        ]
    });
    this.map!.addLayer({
        id: 'radar-layer',
        'type': 'raster',
        'source': 'radar',
        'paint': {
            'raster-fade-duration': 0
        }
    });

    setInterval(() => {
        this.currentImage = (this.currentImage + 1) % this.frameCount;
        (<ImageSource>this.map!.getSource('radar')).updateImage({url: this.getPath()});
    }, 200);
  });


    

  }
}
