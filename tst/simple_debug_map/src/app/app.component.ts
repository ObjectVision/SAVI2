import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SimpleMapComponent } from './simple-map/simple-map.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SimpleMapComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
