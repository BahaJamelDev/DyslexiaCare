// src/app/components/chatbot/chatbot.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatbotService } from 'src/app/services/chat-bot.service';

@Component({
  selector: 'app-chatbot',
  standalone: true,  // Declaring as standalone
  imports: [
    CommonModule,    // Required for ngClass, ngFor
    FormsModule     // Required for ngModel
  ],
  template: `
    <div class="chatbot-container">
      <!-- Chat Messages -->
      <div class="chat-messages" #scrollMe>
        <div *ngFor="let message of messages" 
             [ngClass]="{'user-message': message.sender === 'user', 
                        'bot-message': message.sender === 'bot'}"
             class="message">
          <div class="message-content">
            {{ message.text }}
          </div>
        </div>
      </div>

      <!-- Input Area -->
      <div class="chat-input">
        <input type="text" 
               [(ngModel)]="userInput" 
               (keyup.enter)="sendMessage()"
               placeholder="Ask about dyslexia...">
        <button (click)="sendMessage()">Send</button>
      </div>
    </div>
  `,
  styles: [`
    .chatbot-container {
      width: 350px;
      height: 500px;
      border: 1px solid #ccc;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 15px;
    }

    .message {
      margin: 8px 0;
      padding: 8px 12px;
      border-radius: 15px;
      max-width: 80%;
    }

    .user-message {
      background-color: #007bff;
      color: white;
      margin-left: auto;
    }

    .bot-message {
      background-color: #f1f1f1;
      margin-right: auto;
    }

    .chat-input {
      display: flex;
      padding: 15px;
      border-top: 1px solid #ccc;
    }

    input {
      flex: 1;
      padding: 8px;
      margin-right: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    button {
      padding: 8px 15px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  `]
})
export class ChatbotComponent implements OnInit {
  messages: Array<{text: string, sender: 'user' | 'bot'}> = [];
  userInput: string = '';

  constructor(private chatbotService: ChatbotService) {}

  ngOnInit() {
    this.addBotMessage('Hello! I can help answer your questions about dyslexia. What would you like to know?');
  }

  sendMessage() {
    if (this.userInput.trim()) {
      this.addUserMessage(this.userInput);
      
      this.chatbotService.getResponse(this.userInput)
        .subscribe(response => {
          this.addBotMessage(response);
        });

      this.userInput = '';
    }
  }

  private addUserMessage(text: string) {
    this.messages.push({ text, sender: 'user' });
  }

  private addBotMessage(text: string) {
    this.messages.push({ text, sender: 'bot' });
  }
}