import  { Component } from '@angular/core';
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
  words: string[] = [];           // will hold real words once loaded
  inputs: string[] = [];          // always 10 slots
  score: number | null = null;
  statusMessage = '';

  constructor(private dictationService: DictationService) {}

  startDictation() {
    // 1) Prepare a 10-row table immediately
    this.inputs = new Array(10).fill('');
    this.words  = new Array(10).fill('');   // placeholders so readWords can still index
    this.score = null;
    this.statusMessage = '🔄 Loading words… (table ready, start typing!)';

    // 2) Fetch the real words
    this.dictationService.getWords().subscribe(res => {
      this.words = res.words;               // assume length 10
      this.statusMessage = '✅ Dictation in progress…';
      this.readWords();
    });
  }

  async readWords() {
    for (let i = 0; i < this.words.length; i++) {
      this.speak(this.words[i]);
      await this.delay(5000);
    }
    this.statusMessage = '✅ Dictation complete. Review & submit when ready.';
  }

  speak(text: string) {
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = 'en-GB';
    msg.rate = 0.8;
    speechSynthesis.speak(msg);
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  submit() {
  this.dictationService.submitDictation(this.words, this.inputs)
    .subscribe(_ => {
      // 1) Count exact matches (case-sensitive; for case-insensitive use .toLowerCase())
      let correctCount: number;
      correctCount = this.words
        .map((w, i) => w === this.inputs[i])
        .filter(isCorrect => isCorrect).length;

      // 2) Assign that count directly as your score (0–10)
      this.score = correctCount;

      this.statusMessage = '✅ Test complete. Your score is ready.';
    });
}
  // trackBy to keep Angular from ever re-creating rows
  trackByIndex(i: number) {
    return i;
  }
}
