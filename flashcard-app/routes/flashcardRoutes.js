//Filename: ./routes/flashcardRoutes.js

import express from 'express';
import { getCards, getCard, addCard, editCard, removeCard } from '../controllers/cardController.js';

const router = express.Router();

router.get('/', getCards);
router.get('/cards/:id', getCard);
router.post('/cards', addCard);
router.put('/cards/:id', editCard);
router.delete('/cards/:id', removeCard);

export default router;
