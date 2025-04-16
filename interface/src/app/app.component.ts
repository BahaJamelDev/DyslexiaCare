import { Component,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports:[RouterLink,RouterOutlet] , 
  standalone:true 
})

export class AppComponent {
  title = 'interface';
}
