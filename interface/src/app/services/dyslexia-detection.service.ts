import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DyslexiaDetectionService {
  private apiUrl = 'http://127.0.0.1:5000/predict';

  constructor(private http: HttpClient) { }

  predict(imageFile: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', imageFile);
    return this.http.post(this.apiUrl, formData);

  }
}
