import { Component } from '@angular/core';
import { DyslexiaDetectionService } from 'src/app/services/dyslexia-detection.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface RecommendedExercise {
  mode: 'spelling' | 'grammar' | 'correction';
  typeIndex: number;
  title: string;
  description: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './dyslexia-test.component.html',
  styleUrls: ['./dyslexia-test.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class DyslexiaTestComponent {
  result: any = null;
  error: string = '';
  showRecommendations = false;
  recommendedExercises: RecommendedExercise[] = [];

  constructor(private dyslexiaService: DyslexiaDetectionService) {}

  onFileSelected(event: any): void {
    this.result = null;
    this.error = '';
    this.showRecommendations = false;
    this.recommendedExercises = [];

    const file: File = event.target.files[0];
    if (file) {
      this.dyslexiaService.predict(file).subscribe({
        next: res => {
          this.result = res;
        },
        error: err => this.error = err.message || 'Erreur du serveur'
      });
    }
  }

  generateExerciseRecommendations(): void {
    const [spelling, grammar, correction, phonetics] = this.result.features;

    this.recommendedExercises = [];

    if (spelling < 80) {
      this.recommendedExercises.push(
        { mode: 'spelling', typeIndex: 0, title: 'Reconstituer le mot', description: 'Exercice pour reconstruire les mots mélangés' },
        { mode: 'spelling', typeIndex: 1, title: 'Choisir la bonne orthographe', description: 'Choisissez la bonne écriture parmi les options' },
        { mode: 'spelling', typeIndex: 2, title: 'Remplir les lettres manquantes', description: 'Complétez les mots avec les bonnes lettres' }
      );
    }

    if (grammar < 80) {
      this.recommendedExercises.push(
        { mode: 'grammar', typeIndex: 0, title: 'Corriger la phrase', description: 'Corrigez les erreurs grammaticales' },
        { mode: 'grammar', typeIndex: 1, title: 'Identifier le mot incorrect', description: 'Trouvez le mot qui est mal utilisé' },
        { mode: 'grammar', typeIndex: 2, title: 'Choisir le bon mot', description: 'Complétez la phrase avec le mot approprié' }
      );
    }

    if (correction < 80) {
      this.recommendedExercises.push(
        { mode: 'correction', typeIndex: 0, title: 'Cliquer sur la faute d’orthographe', description: 'Repérez les erreurs dans la phrase' },
        { mode: 'correction', typeIndex: 1, title: 'Réécrire la phrase correctement', description: 'Réécrivez la phrase sans fautes' }
      );
    }

    if (phonetics < 80) {
      this.recommendedExercises.push(
        { mode: 'correction', typeIndex: 2, title: 'Cliquer sur le mauvais homophone', description: 'Trouvez l’homophone incorrect dans la phrase' }
      );
    }

    this.showRecommendations = true;
  }
}
