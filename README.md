# Flashcard-App

## 📚 Overview
A web application for creating, managing, and studying flashcards. Users can add, edit, delete, and flip through flashcards to enhance their learning experience.

## ✨ Features
- **Create Flashcards**: Add new flashcards with questions and answers
- **Study Mode**: Flip cards to test your knowledge
- **Edit & Delete**: Modify or remove existing flashcards
- **Responsive Design**: Works on desktop and mobile devices
- **Validation**: Client-side and server-side validation for all inputs
- **Persistent Storage**: Flashcards saved in PostgreSQL database

## 🛠️ Technologies Used
- **Frontend**: HTML, CSS, JavaScript, EJS templates
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Styling**: Custom CSS with responsive design

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- PostgreSQL (v12+)
- npm or yarn

## Setup Instructions

### 1. Database Setup

#### Start PostgreSQL service:
```bash
sudo service postgresql restart
```

#### Connect to PostgreSQL:
```bash
psql --host=localhost --dbname=flashcards --username=flashcards
```
Password: `card`

### 2. Application Setup

#### Navigate to project directory:
```bash
cd flashcard-app
```

#### Install dependencies:
```bash
npm install
```

#### Run the application:
```bash
npm start
```

#### Access the app:
Open your browser and visit:  
`http://localhost:3000`

## Usage Guide

1. **Add Flashcards**:
   - Click "Add New Flashcard"
   - Enter question and answer
   - Click "Add Card"

2. **Study Flashcards**:
   - Click on any card to flip it
   - Use arrow buttons to navigate

3. **Manage Flashcards**:
   - Click "Edit" to modify cards
   - Click "Delete" to remove cards

## 🎨 Project Structure
```
flashcard-app/
├── config/
│   └── db.js         # Database configuration
├── controllers/
│   └── cardController.js # Business logic
├── models/
│   └── cardModel.js  # Database operations
├── public/
    └── script.css    # Script
│   └── styles.css    # Stylesheet
├── views/
│   ├── cards.ejs     # Main view template
│   └── partials/     # Partial templates
├── .env              # Environment variables template
├── .gitignore
├── app.js            # Main application file
├── package-lock.json
├── package.json
└── README.md
```

## 🔍 Validation Rules
- Both question and answer are required
- Minimum length: 3 characters
- Maximum length: 500 characters
- Input sanitization (trimming whitespace)

## Presentation Link


## Creators
Irish Bigonia & Wendy Alfaro
