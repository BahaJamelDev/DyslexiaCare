import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface Resource {
  title: string;
  category: string;
  description: string;
  format: string;
  level: string;
  pages?: number;
  icon: string;
}

@Component({
  standalone: true,
  selector: 'app-exercices',
  templateUrl: './exercices.component.html',
  styleUrls: ['./exercices.component.css'],
  imports: [CommonModule, RouterModule, HttpClientModule]
})
export class ExercicesComponent {
  resources: Resource[] = [
    {
      title: 'Lecture progressive',
      category: 'Lecture',
      description: 'Exercices de lecture avec des textes adaptés et progression graduelle de la difficulté.',
      format: 'Site web',
      level: 'Débutant',
      pages: 218,
      icon: '📚'
    },
    {
      title: 'Cahier d\'exercices d\'écriture',
      category: 'écriture',
      description: 'Exercices pratiques pour améliorer l\'écriture et la formation des lettres.',
      format: 'PDF',
      level: 'Intermédiaire',
      pages: 31,
      icon: '✏️'
    },
    {
      title: 'Jeu de sons et syllabes',
      category: 'Phonétique',
      description: 'Application interactive pour travailler la conscience phonologique et la reconnaissance des sons.',
      format: '',
      level: 'Avancé',
      pages: 0,
      icon: '🔊'
    },
    {
      title: 'Exercices de mémoire visuelle',
      category: 'Mémoire',
      description: 'Activités pour renforcer la mémoire visuelle et la reconnaissance des mots.',
      format: 'PDF',
      level: 'Avancé',
      pages: 43,
      icon: '🧠'
    },
    {
      title: 'Histoire adaptée',
      category: 'Lecture',
      description: 'histoire courte avec mise en forme adaptée pour les lecteurs dyslexiques.',
      format: 'PDF',
      level: 'Intermédiaire',
      pages: 3,
      icon: '📕'
    },
    {
      title: 'Guide orthographique',
      category: 'Écriture',
      description: 'Méthodes et astuces pour mémoriser l\'orthographe des mots difficiles.',
      format: 'PDF',
      level: 'Débutant',
      pages: 126,
      icon: '📝'
    }

  ];

  constructor(private http: HttpClient) {}

  downloadPdf(resourceTitle: string) {
    const pdfMapping: { [key: string]: string } = {
      'Lecture progressive': '/assets/pdf/aa1.pdf',
      'Cahier d\'exercices d\'écriture': '/assets/pdf/aa2.pdf',
      'Exercices de mémoire visuelle': '/assets/pdf/aa3.pdf',
      'Jeu de sons et syllabes': '/assets/pdf/aa5.pdf',
      'Histoire adaptée': '/assets/pdf/aa4.pdf',
      'Guide orthographique': '/assets/pdf/aa6.pdf'
      // Ajoutez d'autres mappings selon vos PDFs
    };

    const pdfPath = pdfMapping[resourceTitle];
    if (!pdfPath) {
      console.error('PDF non trouvé pour:', resourceTitle);
      alert('Désolé, ce PDF n\'est pas disponible pour le moment.');
      return;
    }

    this.http.get(pdfPath, { responseType: 'blob' })
      .subscribe({
        next: (blob: Blob) => {
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `${resourceTitle}.pdf`;
          link.click();
          window.URL.revokeObjectURL(url);
        },
        error: (error) => {
          console.error('Erreur lors du téléchargement:', error);
          alert('Erreur lors du téléchargement du PDF. Veuillez réessayer.');
        }
      });
  }
}
