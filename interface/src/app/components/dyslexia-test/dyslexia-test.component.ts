// dyslexia-test.component.ts
import { Component, OnInit } from '@angular/core';
import { DyslexiaDetectionService, DyslexiaAnalysisResult } from '../../services/dyslexia-detection.service';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-dyslexia-test',
  templateUrl: './dyslexia-test.component.html',
  styleUrls: ['./dyslexia-test.component.css'],
  imports: [CommonModule, RouterModule],
})
export class DyslexiaTestComponent implements OnInit {
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  isAnalyzing = false;
  result: DyslexiaAnalysisResult | null = null;
  userId: string = '';
  showDetails = false;
  extractedText: string = '';

  constructor(
    private dyslexiaService: DyslexiaDetectionService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getCurrentUserId();
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    this.result = null;
    this.extractedText = '';
    
    // Afficher une prévisualisation de l'image
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  analyzeHandwriting(): void {
    if (!this.selectedFile) {
      this.toastr.error('Veuillez sélectionner une image d\'écriture manuscrite.');
      return;
    }

    this.isAnalyzing = true;
    
    this.dyslexiaService.analyzeHandwriting(this.selectedFile).subscribe({
      next: (result) => {
        this.result = result;
        this.extractedText = result.extracted_text;
        this.isAnalyzing = false;
        
        // Sauvegarder le résultat dans le profil de l'utilisateur
        this.saveResult(result);
      },
      error: (error) => {
        console.error('Erreur lors de l\'analyse:', error);
        this.toastr.error('Une erreur est survenue lors de l\'analyse: ' + (error.error?.error || 'Erreur inconnue'));
        this.isAnalyzing = false;
      }
    });
  }

  saveResult(result: DyslexiaAnalysisResult): void {
    this.dyslexiaService.saveResult(this.userId, result).subscribe({
      next: () => {
        this.toastr.success('Le résultat a été enregistré avec succès.');
      },
      error: (error) => {
        console.error('Erreur lors de l\'enregistrement du résultat:', error);
        this.toastr.warning('Le résultat n\'a pas pu être enregistré.');
      }
    });
  }

  resetTest(): void {
    this.selectedFile = null;
    this.previewUrl = null;
    this.result = null;
    this.extractedText = '';
  }

  getSeverityClass(): string {
    if (!this.result) return '';
    
    switch (this.result.severity) {
      case 'Élevée': return 'severity-high';
      case 'Modérée': return 'severity-medium';
      case 'Légère': return 'severity-low';
      default: return 'severity-none';
    }
  }

  toggleDetails(): void {
    this.showDetails = !this.showDetails;
  }

  getFeatureDescription(feature: string): string {
    switch (feature) {
      case 'spelling_accuracy':
        return 'Précision orthographique: mesure combien l\'écriture est correcte orthographiquement.';
      case 'grammatical_accuracy':
        return 'Précision grammaticale: mesure la conformité aux règles grammaticales.';
      case 'percentage_of_corrections':
        return 'Pourcentage de corrections: indique combien de corrections sont nécessaires pour le texte.';
      case 'percentage_of_phonetic_accuracy':
        return 'Précision phonétique: mesure la correspondance entre l\'orthographe et la prononciation.';
      default:
        return '';
    }
  }
}