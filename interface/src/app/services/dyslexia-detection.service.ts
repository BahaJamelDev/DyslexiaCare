import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

export interface DyslexiaFeatures {
  spelling_accuracy: number;
  grammatical_accuracy: number;
  percentage_of_corrections: number;
  percentage_of_phonetic_accuracy: number;
  [key: string]: number; // Signature d'index pour permettre l'accès dynamique avec des chaîne
}

export interface DyslexiaAnalysisResult {
  probability: number;
  severity: string;
  timestamp: string;
  image_path: string;
  features: DyslexiaFeatures;
  extracted_text: string;
}

export interface UserResults {
  user_id: string;
  results: DyslexiaAnalysisResult[];
}

@Injectable({
  providedIn: 'root'
})
export class DyslexiaDetectionService {
  private apiUrl = environment.apiUrl + '/api';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  // Préparer les headers avec le token d'authentification
  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // Vérifier si l'API est en ligne
  checkApiHealth(): Observable<any> {
    return this.http.get(`${this.apiUrl}/health`);
  }

  // Analyser une image manuscrite
  analyzeHandwriting(imageFile: File): Observable<DyslexiaAnalysisResult> {
    const formData = new FormData();
    formData.append('image', imageFile);
    
    return this.http.post<DyslexiaAnalysisResult>(
      `${this.apiUrl}/analyze`,
      formData,
      { headers: this.getHeaders() }
    );
  }

  // Récupérer les résultats précédents d'un utilisateur
  getUserResults(userId: string): Observable<UserResults> {
    return this.http.get<UserResults>(
      `${this.apiUrl}/results/${userId}`,
      { headers: this.getHeaders() }
    );
  }

  // Sauvegarder un résultat dans le profil de l'utilisateur
  saveResult(userId: string, result: DyslexiaAnalysisResult): Observable<any> {
    const data = {
      userId: userId,
      result: result
    };
    
    return this.http.post(
      `${this.apiUrl}/save_result`,
      data,
      { headers: this.getHeaders() }
    );
  }
}