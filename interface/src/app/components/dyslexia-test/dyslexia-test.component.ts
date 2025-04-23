import { Component } from '@angular/core';
import { DyslexiaDetectionService } from 'src/app/services/dyslexia-detection.service';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './dyslexia-test.component.html',
  styleUrls: ['./dyslexia-test.component.css'] ,
  standalone: true ,
  imports:[CommonModule,RouterModule]
})
export class DyslexiaTestComponent {
  result: any = null;
  error: string = '';

  constructor(private dyslexiaService: DyslexiaDetectionService) {}

  onFileSelected(event: any): void {
    this.result = null;
    this.error = '';
    const file: File = event.target.files[0];
    if (file) {
      this.dyslexiaService.predict(file).subscribe({
        next: res    => this.result = res,
        error: err   => this.error  = err.message || 'Server error'
      });
    }
  }
}
