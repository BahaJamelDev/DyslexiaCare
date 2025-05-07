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
  scrambled?: string;
  template?: string;
  word?: string;
  options?: string[];
  sentenceTemplate?: string;
  original?: string;
  correct?: string;
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
  mode: 'spelling' | 'grammar' | 'correction' | '' = '';
  typeIndex = 0;
  exampleIndex = 0;
  userInput = '';
  result = '';

  exercises: ExerciseSet = {
    spelling: [
      {
        type: 'unscramble',
        title: 'Reconstituer le mot',
        examples: [
          { scrambled: 'écolle', word: 'école' },
          { scrambled: 'parceeuq', word: 'parceque' }
        ]
      },
      {
        type: 'multipleChoice',
        title: 'Choisir la bonne orthographe',
        examples: [
          {
            options: ['définitivement', 'définitivemment', 'definitivement'],
            correct: 'définitivement'
          },
          {
            options: ['séparé', 'séparer', 'separer'],
            correct: 'séparer'
          }
        ]
      },
      {
        type: 'fillBlank',
        title: 'Remplir les lettres manquantes',
        examples: [
          { template: 'p_r_equ_', word: 'parceque' },
          { template: 'c_l', word: 'école' }
        ]
      }
    ],

    grammar: [
      {
        type: 'fixSentence',
        title: 'Corriger la phrase',
        examples: [
          {
            original: 'Elle aller à l’école chaque jour.',
            correct: 'Elle va à l’école chaque jour.'
          },
          {
            original: 'Ils était au parc.',
            correct: 'Ils étaient au parc.'
          }
        ]
      },
      {
        type: 'identifyWrongWord',
        title: 'Identifier le mot incorrect',
        examples: [
          {
            sentenceWords: ['Il', 'ne', 'vas', 'pas', 'bien'],
            wrongIndex: 2
          },
          {
            sentenceWords: ['Elle', 'ont', 'un', 'chat.'],
            wrongIndex: 1
          }
        ]
      },
      {
        type: 'chooseWord',
        title: 'Choisir le bon mot',
        examples: [
          {
            sentenceTemplate: 'Elle _ à l’école chaque jour.',
            options: ['va', 'vont'],
            correct: 'va'
          },
          {
            sentenceTemplate: 'Ils _ contents hier.',
            options: ['étaient', 'était'],
            correct: 'étaient'
          }
        ]
      }
    ],

    correction: [
      {
        type: 'clickSpelling',
        title: 'Cliquer sur la faute d’orthographe',
        examples: [
          {
            sentenceWords: ['Elle', 'boi', 'de', 'l’eau.'],
            wrongIndex: 1
          },
          {
            sentenceWords: ['Je', 'marché', 'à', 'la', 'maison.'],
            wrongIndex: 1
          }
        ]
      },
      {
        type: 'rewriteSentence',
        title: 'Réécrire la phrase correctement',
        examples: [
          {
            original: 'Il aller à l’école.',
            correct: 'Il va à l’école.'
          },
          {
            original: 'Nous était ici.',
            correct: 'Nous étions ici.'
          }
        ]
      },
      {
        type: 'clickHomophone',
        title: 'Cliquer sur le mauvais homophone',
        examples: [
          {
            sentenceWords: ['C’est', 'leurs', 'amis.'],
            wrongIndex: 1
          },
          {
            sentenceWords: ['Son', 'chat', 'est', 'gentil.'],
            wrongIndex: 0
          }
        ]
      }
    ]
  };

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

  nextExample() {
    if (this.exampleIndex < this.currentExamples.length - 1) {
      this.exampleIndex++;
      this.userInput = '';
      this.result = '';
    }
  }

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
      ? '✅ Correct !'
      : `❌ Réessaie. Réponse correcte : ${answerKey}`;
  }

  checkClick(idx: number) {
    const wrong = this.currentExample.wrongIndex!;
    this.result =
      idx === wrong ? '✅ Bien vu !' : '❌ Non, ce mot est correct.';
  }
}
