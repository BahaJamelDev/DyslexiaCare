import { Component } from '@angular/core';
import { DictationService } from 'src/app/services/dictation.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dictation',
  templateUrl: './dictation.component.html',
  styleUrls: ['./dictation.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule]
})
export class DictationComponent {
  words: string[] = [];           // contiendra les vrais mots une fois chargés
  inputs: string[] = [];          // toujours 10 cases
  score: number | null = null;
  statusMessage = '';

  constructor(private dictationService: DictationService) {}

  startDictation() {
    // 1) Préparer immédiatement un tableau de 10 lignes
    this.inputs = new Array(10).fill('');
    this.words  = new Array(10).fill('');   // des espaces réservés pour permettre l’indexation par readWords
    this.score = null;
    this.statusMessage = '🔄 Chargement des mots… (table prête, commencez à écrire !)';

    // 2) Récupérer les vrais mots
    this.dictationService.getWords().subscribe(res => {
      this.words = res.words;               // on suppose une longueur de 10
      this.statusMessage = '✅ Dictée en cours…';
      this.readWords();
    });
  }

  async readWords() {
    for (let i = 0; i < this.words.length; i++) {
      this.speak(this.words[i]);
      await this.delay(5000);
    }
    this.statusMessage = '✅ Dictée terminée. Vérifiez et soumettez quand vous êtes prêt.';
  }

  speak(text: string) {
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = 'fr-FR';
    msg.rate = 0.8;
    speechSynthesis.speak(msg);
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  submit() {
    this.dictationService.submitDictation(this.words, this.inputs)
      .subscribe(_ => {
        // 1) Compter les correspondances exactes (sensible à la casse ; pour ignorer la casse utiliser .toLowerCase())
        let correctCount: number;
        correctCount = this.words
          .map((w, i) => w === this.inputs[i])
          .filter(isCorrect => isCorrect).length;

        // 2) Attribuer ce nombre directement comme score (0–10)
        this.score = correctCount;

        this.statusMessage = '✅ Test terminé. Votre score est prêt.';
      });
  }

  // trackBy pour éviter qu'Angular ne recrée les lignes inutilement
  trackByIndex(i: number) {
    return i;
  }
}
