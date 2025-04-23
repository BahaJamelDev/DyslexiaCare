// dyslexia-services.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
@Component({
  selector: 'app-dyslexia-services',
  templateUrl: './dyslexia-service.component.html',
  styleUrls: ['./dyslexia-service.component.css'] ,
  standalone: true ,
  imports:[CommonModule,FormsModule,RouterModule]
})
export class DyslexiaServicesComponent {
  selectedService: string = '';

  constructor(private router: Router) {}

  selectService(service: string): void {
    this.selectedService = service;
  }

  startTest(): void {
    if (this.selectedService === 'dictation') {
      this.router.navigate(['/dictation']);
    } else if (this.selectedService === 'writing') {
      this.router.navigate(['/test']);
    }
  }
}
