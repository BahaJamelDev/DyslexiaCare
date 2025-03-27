import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideRouter, RouterModule } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports:[CommonModule,RouterModule],
  standalone: true,  // Ajout de standalone
})
export class HomeComponent {

}
