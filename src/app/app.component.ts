import { Component } from '@angular/core';
import { CommonModule} from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ScrollyImagesComponent } from './scrolly-images/scrolly-images.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    ScrollyImagesComponent
  ],
  template: '<app-scrolly-images></app-scrolly-images>',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'efecto1';
}
