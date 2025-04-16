// src/app/services/chatbot.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

interface FAQDatabase {
  [key: string]: string;  // This allows string indexing
}

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private faqDatabase: FAQDatabase = {
    'what is dyslexia': 'Dyslexia is a learning disorder that involves difficulty reading due to problems identifying speech sounds and learning how they relate to letters and words.',
    
    'what are the signs of dyslexia': 'Common signs include: difficulty reading, problems with spelling, confusing letter order, delayed speech development, and difficulty following instructions.',
    
    'can dyslexia be cured': 'Dyslexia is not a disease, so it cannot be cured. However, with proper support, teaching methods, and strategies, individuals with dyslexia can learn to read and write successfully.',
    
    'how is dyslexia diagnosed': 'Dyslexia is typically diagnosed through comprehensive evaluations by educational psychologists or specialists, including reading tests, IQ tests, and family history.',
    
    'what causes dyslexia': 'Dyslexia is believed to be caused by differences in how the brain processes language. It often runs in families and appears to be linked to certain genes.',
    
    'how common is dyslexia': 'Dyslexia is one of the most common learning disabilities, affecting approximately 20% of the population to some degree.',
    
    'can adults have dyslexia': 'Yes, dyslexia is a lifelong condition. Many adults have dyslexia, some diagnosed in childhood and others identified later in life.',
    
    'how can i help someone with dyslexia': 'You can help by being patient, using clear communication, providing extra time for reading tasks, and using multi-sensory learning approaches.',
    
    'what accommodations help dyslexic students': 'Helpful accommodations include extra time for tests, text-to-speech software, recorded lectures, audiobooks, and specialized reading instruction.',
    
    'is dyslexia related to intelligence': 'No, dyslexia is not related to intelligence. People with dyslexia have normal to above-average intelligence but process language differently.'
  };

  constructor() {}

  getResponse(userInput: string): Observable<string> {
    const normalizedInput = userInput.toLowerCase().trim();
    
    // Find the best matching question
    let bestMatch = this.findBestMatch(normalizedInput);
    
    if (bestMatch) {
      return of(this.faqDatabase[bestMatch]);
    }
    
    return of("I'm not sure about that. Could you rephrase your question about dyslexia?");
  }

  private findBestMatch(input: string): string | null {
    const questions = Object.keys(this.faqDatabase);
    
    // Simple matching algorithm
    for (let question of questions) {
      if (input.includes(question) || question.includes(input)) {
        return question;
      }
    }

    // Check for keyword matches
    const keywords = input.split(' ');
    for (let question of questions) {
      for (let keyword of keywords) {
        if (keyword.length > 3 && question.includes(keyword)) {
          return question;
        }
      }
    }

    return null;
  }
}