//Filename: ./routes/flashcardRoutes.js

import express from 'express';
import { 
  getCards, 
  showAddForm, 
  addCard, 
  showEditForm, 
  editCard, 
  removeCard,
  //flipCard
} from '../controllers/cardController.js';

const router = express.Router();

// View cards with flip state
router.get('/', getCards);

// Add card
router.get('/add-card', showAddForm);
router.post('/add-card', addCard);

// Edit card
router.get('/edit-card/:id', showEditForm);
router.post('/edit-card/:id', editCard);

// Delete card
router.post('/delete-card/:id', removeCard);

export default router;