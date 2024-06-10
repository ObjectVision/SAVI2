import { Component } from '@angular/core';
import {Map, StyleSpecification, Source, ImageSource} from 'maplibre-gl';
import { interval, Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as hls from 'hls-parser';

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

  async parseM3U8FromUrl(url: string) {
    const response = await fetch(url);
    const m3u8Text = await response.text();
    const parsedManifest = hls.parse(m3u8Text);
    return parsedManifest;
  }

  async updateImageSource() {
    try {
      this.currentImage = (this.currentImage + 1) % this.frameCount;
      let newImageUrl:string = await this.fetchNewImageUrl(); // this.getInitialImageUrl();

      // get camera stream m3u8:
      let response = await fetch("https://live.netcamviewer.nl/Port-of-Amsterdam-Havenkantoor/480");
      let text = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, 'text/html');
      const videoElement = doc.querySelector('video');
      if (videoElement) {
        // get chunklist m3u8
        let videoSrc = videoElement.querySelector('source')?.getAttribute('src');
        let manifest = await this.parseM3U8FromUrl(videoSrc!);
        if (videoSrc && manifest) {
          let chunkListUrl = (<any>manifest).variants[0].uri;
          
          // get chunks from chunklist
          let chunklistManifest = await this.parseM3U8FromUrl("https://5f27cc8163c2e.streamlock.net/480/480.stream/" + chunkListUrl!);
          
          let i = 0;
        }
        let i = 0;
      }

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
      minZoom: 14,
      zoom: 17,
      center: [-122.514426, 37.562984],
      bearing: -96,
    });

    this.map.on('load', () => {
      this.map!.addSource('video', {
        type: 'video',
        urls: [
            'https://static-assets.mapbox.com/mapbox-gl-js/drone.mp4',
            'https://static-assets.mapbox.com/mapbox-gl-js/drone.webm'
        ],
        coordinates: [
            [-122.51596391201019, 37.56238816766053],
            [-122.51467645168304, 37.56410183312965],
            [-122.51309394836426, 37.563391708549425],
            [-122.51423120498657, 37.56161849366671]
        ]
    });
    this.map!.addLayer({
        id: 'video-layer',
        'type': 'raster',
        'source': 'video',
        'paint': {
            'raster-fade-duration': 0
        }
    });

    //this.startPeriodicTask();
  });


    

  }
}
