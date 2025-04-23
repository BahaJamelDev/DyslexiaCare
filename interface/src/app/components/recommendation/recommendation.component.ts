import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-exercises',
  templateUrl: './recommendation.component.html',
  standalone: true,
  styleUrls: ['./recommendation.component.css'] ,
  imports: [CommonModule, RouterModule, FormsModule]
})
export class RecommendationComponent {
  // which exercise is active
  mode: 'spelling' | 'grammar' | 'correction' | '' = '';

  // shared
  userInput = '';
  result = '';

  // Spelling data
  word = 'school';
  scrambledWord = 'hlosco';

  // Grammar data
  originalSentence = 'She go to school every day.';
  correctSentence  = 'She goes to school every day.';

  // Correction data
  sentenceWords = ['He', 'go', 'to', 'school'];
  wrongIndex = 1;

  // Switch mode and reset
  start(mode: 'spelling' | 'grammar' | 'correction') {
    this.mode = mode;
    this.userInput = '';
    this.result = '';
  }

  checkSpelling() {
    this.result = this.userInput.trim().toLowerCase() === this.word
      ? '✅ Correct!'
      : '❌ Try again';
  }

  checkGrammar() {
    this.result = this.userInput.trim() === this.correctSentence
      ? '✅ Correct!'
      : '❌ Try again';
  }

  checkCorrection(i: number) {
    this.result = i === this.wrongIndex
      ? '✅ You spotted it!'
      : '❌ Nope, that word is fine';
  }
}
