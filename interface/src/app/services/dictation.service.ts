import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DictationService {
  private apiUrl = 'http://127.0.0.1:5000/dictation';

  constructor(private http: HttpClient) {}

  getWords(): Observable<any> {
    return this.http.get(`${this.apiUrl}/words`);
  }

  submitDictation(expected: string[], typed: string[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/score`, { expected, typed });
  }
}
