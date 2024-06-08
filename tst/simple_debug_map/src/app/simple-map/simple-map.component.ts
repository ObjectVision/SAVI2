import { Component } from '@angular/core';
import {Map, StyleSpecification, Source, ImageSource} from 'maplibre-gl';
import { interval, Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
  subscription: Subscription | undefined;
  source = interval(10000);
  destroy$ = new Subject<void>();

  imageData = new Uint8Array([
    // Add your image raw data here (e.g., RGBA values)
    // This is just an example, you need to replace it with actual image data
    0, 0, 0, 255, 0, 0, 0, 255,
    0, 0, 0, 255, 0, 0, 0, 255,
    0, 0, 0, 255, 0, 0, 0, 255,
    0, 0, 0, 255, 0, 0, 0, 255
  ]);

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

  async fetchNewImageUrl(): Promise<string> {
    return (
      `https://maplibre.org/maplibre-gl-js/docs/assets/radar${
          this.currentImage
      }.gif`
    );
  }

  getInitialImageUrl() {
    //let test = this.fetchNewImageUrl();
    return (
        `https://maplibre.org/maplibre-gl-js/docs/assets/radar${
            this.currentImage
        }.gif`
    );
  }

  async updateImageSource() {
    try {
      this.currentImage = (this.currentImage + 1) % this.frameCount;
      let newImageUrl:string = await this.fetchNewImageUrl(); // this.getInitialImageUrl();
      (<ImageSource>this.map!.getSource('radar')).updateImage({url: newImageUrl});
    } catch (error) {
      console.error('Failed to update image source:', error);
    }
  }

  private startPeriodicTask(): void {
    interval(200) // Emit value every 10 seconds
      .pipe(takeUntil(this.destroy$)) // Unsubscribe when destroy$ emits a value
      .subscribe(() => {
        this.updateImageSource();
      });
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
        url: this.getInitialImageUrl(),
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

    this.startPeriodicTask();

    //this.subscription = this.source.subscribe(val => this.updateImageSource());
    //setInterval(this.updateImageSource, 200);

    /*setInterval(() => {
        //const width = 2; // Width of the image
        //const height = 2; // Height of the ima
        //const image = new ImageData(new Uint8ClampedArray(this.imageData), width);
        //this.map!.style.imageManager.updateImage('radar', (<any>image));
        let test = await fetch('https://api.github.com/users/github');
        this.currentImage = (this.currentImage + 1) % this.frameCount;
        (<ImageSource>this.map!.getSource('radar')).updateImage({url: this.getPath()});
    }, 200);*/
  });


    

  }
}
