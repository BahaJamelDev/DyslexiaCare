import { Injectable } from '@angular/core';
import { Storage, ref, getDownloadURL } from '@angular/fire/storage';


@Injectable({
  providedIn: 'root'
})
export class PdfService {
  
  constructor(private storage: Storage) { }
  
  // Obtenir l'URL de téléchargement d'un PDF
  async getPdfUrl(pdfPath: string): Promise<string> {
    const storageRef = ref(this.storage, 'pdfs/' + pdfPath);
    try {
      return await getDownloadURL(storageRef);
    } catch (error) {
      console.error('Erreur lors de la récupération du PDF:', error);
      throw error;
    }
  }
  
  // Télécharger un PDF
  async downloadPdf(pdfPath: string, displayName: string): Promise<void> {
    try {
      const url = await this.getPdfUrl(pdfPath);
      const link = document.createElement('a');
      link.href = url;
      link.download = displayName || pdfPath;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Erreur lors du téléchargement du PDF:', error);
      throw error;
    }
  }
}