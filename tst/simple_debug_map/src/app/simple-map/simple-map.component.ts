import { Component } from '@angular/core';
import {Map} from 'maplibre-gl';

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

  ngOnInit() {
    this.map = new Map({
      container: 'map', // container id
      style: 'https://demotiles.maplibre.org/style.json', // style URL
      center: [this.lng, this.lat], // starting position [lng, lat]
      zoom: 5 // starting zoom
    });
  }

  /*map : mapboxgl.Map | undefined; // @ts-ignore: Object is possibly 'null'.
	object_vision_mapbox_access_token = 'pk.eyJ1IjoiZXJpa291ZGVqYW5zIiwiYSI6ImNsc3Jic3J4eDE2amcyaXBzdDNvNWxmMnQifQ.t-iuMEfsoQc9Y2WVTbVTTg';
  style = 'mapbox://styles/mapbox/streets-v12';


  
    var map = new maplibregl.Map({
      container: 'map', // container id
      style: 'https://demotiles.maplibre.org/style.json', // style URL
      center: [0, 0], // starting position [lng, lat]
      zoom: 1 // starting zoom
  });

  nav_control: mapboxgl.NavigationControl | undefined;
  
  ngOnInit() {
    this.map = new mapboxgl.Map({
       accessToken: this.object_vision_mapbox_access_token,
       container: 'map',
       style: this.style,
       zoom: 3,
       projection: {name:"mercator"},
       center: [this.lng, this.lat],
       attributionControl: false,
       logoPosition: 'bottom-right'
     });
  }
*/
}
