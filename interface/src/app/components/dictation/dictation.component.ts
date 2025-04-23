import { Component } from '@angular/core';
import { DictationService } from 'src/app/services/dictation.service';
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-dictation',
  templateUrl: './dictation.component.html',
  styleUrls: ['./dictation.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule]
})
export class DictationComponent {
  words: string[] = [];
  inputs: string[] = new Array(10).fill('');
  score: number | null = null;

  speaking: boolean = false;
  currentWordIndex: number = -1;
  statusMessage: string = '';

  constructor(private dictationService: DictationService) {}

  startDictation() {
    this.statusMessage = '🔄 Loading words...';
    this.dictationService.getWords().subscribe(res => {
      this.words = res.words;
      this.inputs = new Array(10).fill('');
      this.score = null;
      this.currentWordIndex = -1;
      this.statusMessage = '✅ Dictation in progress...';
      this.speaking = true;
      this.readWords();
    });
  }

  async readWords() {
    for (let i = 0; i < this.words.length; i++) {
      this.currentWordIndex = i;
      this.speak(this.words[i]);
      await this.delay(5000); // wait 5 sec per word
    }
    this.speaking = false;
    this.statusMessage = '✅ Dictation complete. You can now type your answers.';
  }

  speak(text: string) {
    const msg = new SpeechSynthesisUtterance();
    msg.text = text;
    msg.lang = 'en-GB';
    msg.rate = 0.8;
    speechSynthesis.speak(msg);
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  submit() {
    this.dictationService.submitDictation(this.words, this.inputs).subscribe(res => {
      this.score = res.levenshtein_score;
      this.statusMessage = '✅ Test complete. You can review your score.';
    });
  }
}
