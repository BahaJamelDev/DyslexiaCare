# DyslexiaCare 🧠📚

**DyslexiaCare** est une plateforme web intelligente conçue pour détecter les signes de dyslexie chez les utilisateurs et recommander des exercices adaptés. Ce projet combine l'intelligence artificielle, une interface utilisateur intuitive et des outils d'analyse pour offrir un soutien personnalisé.

## 🚀 Fonctionnalités principales

- 🔍 Analyse intelligente de textes pour détecter les signes de dyslexie
- 📈 Recommandation dynamique d'exercices adaptés selon le profil
- 🖥️ Interface utilisateur responsive conçue avec Figma
- 🧠 Connexion à une API d’intelligence artificielle pour le traitement des données
- 📊 Tableau de bord pour le suivi des résultats

## 🛠️ Technologies utilisées

- **Frontend** : Angular, HTML, CSS
- **Backend** : Flask (Python)
- **IA** : API externe d’analyse linguistique
- **UI Design** : Figma
- **Versioning** : Git & GitHub

## 📦 Installation (développeurs)

### Prérequis

- [Node.js](https://nodejs.org/)
- [Angular CLI](https://angular.io/cli)
- [Python 3.8+](https://www.python.org/)
- [pip](https://pip.pypa.io/)
- [Git](https://git-scm.com/)

### 1. Cloner le dépôt

```bash
git clone https://github.com/BahaJamelDev/DyslexiaCare.git
cd DyslexiaCare


### 2. Lancer le frontend

cd frontend
npm install
ng serve

### 3. Lancer le backend 

cd backend
python -m venv venv
source venv/bin/activate  # ou `venv\Scripts\activate` sous Windows
pip install -r requirements.txt
flask run

