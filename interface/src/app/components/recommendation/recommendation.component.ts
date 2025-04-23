import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

type ExerciseType =
  | 'unscramble'
  | 'multipleChoice'
  | 'fillBlank'
  | 'fixSentence'
  | 'identifyWrongWord'
  | 'chooseWord'
  | 'clickSpelling'
  | 'rewriteSentence'
  | 'clickHomophone';

interface Example {
  // Unscramble / Fill-Blank
  scrambled?: string;
  template?: string;
  word?: string;

  // Multiple-Choice / ChooseWord
  options?: string[];
  correct?: string;
  sentenceTemplate?: string;

  // Fix / Rewrite
  original?: string;

  // Click-type
  sentenceWords?: string[];
  wrongIndex?: number;
}

interface Exercise {
  type: ExerciseType;
  title: string;
  examples: Example[];
}

interface ExerciseSet {
  [mode: string]: Exercise[];
}

@Component({
  selector: 'app-exercises',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule]
})
export class RecommendationComponent {
  // --- UI State ---
  mode: 'spelling' | 'grammar' | 'correction' | '' = '';
  typeIndex = 0;        // which of the 3 types
  exampleIndex = 0;     // which of the 2 examples
  userInput = '';
  result = '';

  // --- All 9 × 2 = 18 Exercises ---
  exercises: ExerciseSet = {
    spelling: [
      {
        type: 'unscramble',
        title: 'Unscramble the word',
        examples: [
          { scrambled: 'hlosco', word: 'school' },
          { scrambled: 'ecaubse', word: 'because' }
        ]
      },
      {
        type: 'multipleChoice',
        title: 'Choose the correct spelling',
        examples: [
          {
            options: ['definitely', 'definately', 'definetely'],
            correct: 'definitely'
          },
          {
            options: ['separate', 'seperate', 'separat'],
            correct: 'separate'
          }
        ]
      },
      {
        type: 'fillBlank',
        title: 'Fill in the missing letters',
        examples: [
          { template: 'b_ca_e', word: 'because' },
          { template: 'sch__l', word: 'school' }
        ]
      }
    ],

    grammar: [
      {
        type: 'fixSentence',
        title: 'Fix the sentence',
        examples: [
          {
            original: 'She go to school every day.',
            correct: 'She goes to school every day.'
          },
          {
            original: 'They was playing in the park.',
            correct: 'They were playing in the park.'
          }
        ]
      },
      {
        type: 'identifyWrongWord',
        title: 'Identify the incorrect word',
        examples: [
          {
            sentenceWords: ['He', 'don’t', 'like', 'apples'],
            wrongIndex: 1
          },
          {
            sentenceWords: ['She', 'have', 'a', 'book.'],
            wrongIndex: 1
          }
        ]
      },
      {
        type: 'chooseWord',
        title: 'Choose the correct word',
        examples: [
          {
            sentenceTemplate: 'She _ to school every day.',
            options: ['go', 'goes'],
            correct: 'goes'
          },
          {
            sentenceTemplate: 'They _ happy yesterday.',
            options: ['was', 'were'],
            correct: 'were'
          }
        ]
      }
    ],

    correction: [
      {
        type: 'clickSpelling',
        title: 'Click the incorrect spelling',
        examples: [
          {
            sentenceWords: ['She', 'drinkz', 'water', 'daily.'],
            wrongIndex: 1
          },
          {
            sentenceWords: ['I', 'walkd', 'home', 'yesterday.'],
            wrongIndex: 1
          }
        ]
      },
      {
        type: 'rewriteSentence',
        title: 'Rewrite the sentence correctly',
        examples: [
          {
            original: 'He go to school.',
            correct: 'He goes to school.'
          },
          {
            original: 'They was here.',
            correct: 'They were here.'
          }
        ]
      },
      {
        type: 'clickHomophone',
        title: 'Click the wrong homophone',
        examples: [
          {
            sentenceWords: ['Their', 'going', 'to', 'the', 'park.'],
            wrongIndex: 0
          },
          {
            sentenceWords: ['Its', 'a', 'good', 'day.'],
            wrongIndex: 0
          }
        ]
      }
    ]
  };

  // --- Mode & Type Selection ---
  start(mode: 'spelling' | 'grammar' | 'correction') {
    this.mode = mode;
    this.typeIndex = 0;
    this.exampleIndex = 0;
    this.userInput = '';
    this.result = '';
  }

  selectType(i: number) {
    this.typeIndex = i;
    this.exampleIndex = 0;
    this.userInput = '';
    this.result = '';
  }

  // --- Navigation ---
  nextExample() {
    if (this.exampleIndex < this.currentExamples.length - 1) {
      this.exampleIndex++;
      this.userInput = '';
      this.result = '';
    }
  }

  // --- Helpers & Getters ---
  get currentExercise(): Exercise {
    return this.exercises[this.mode]![this.typeIndex];
  }
  get currentExamples(): Example[] {
    return this.currentExercise.examples;
  }
  get currentExample(): Example {
    return this.currentExamples[this.exampleIndex];
  }
  get totalTypes(): number {
    return this.mode ? this.exercises[this.mode]!.length : 0;
  }
  get totalExamples(): number {
    return this.currentExamples.length;
  }

  // --- Answer Checking ---
  checkAnswer() {
    const ex = this.currentExample;
    let correct = false;
    let answerKey = '';

    switch (this.currentExercise.type) {
      case 'unscramble':
      case 'fillBlank':
        correct =
          this.userInput.trim().toLowerCase() === ex.word!.toLowerCase();
        answerKey = ex.word!;
        break;

      case 'multipleChoice':
      case 'chooseWord':
        correct = this.userInput === ex.correct;
        answerKey = ex.correct!;
        break;

      case 'fixSentence':
      case 'rewriteSentence':
        correct = this.userInput.trim() === ex.correct;
        answerKey = ex.correct!;
        break;
    }

    this.result = correct
      ? '✅ Correct!'
      : `❌ Try again. ,  Correct:  "${answerKey}" `;
  }

  checkClick(idx: number) {
    const wrong = this.currentExample.wrongIndex!;
    this.result =
      idx === wrong ? '✅ You spotted it!' : '❌ Nope, that one is fine.';
  }
}
