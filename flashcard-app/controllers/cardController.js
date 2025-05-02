//Filename: ../controllers/cardController.js
import { getAllCards, getCardById, createCard, updateCard, deleteCard } from '../models/cardModel.js';

const renderWithDefaults = (res, options = {}) => {
  const defaults = {
    mode: 'view',
    currentIndex: 0,
    isFlipped: false,
    cardToEdit: null,
    error: null,
    formData: { question: '', answer: '' }
  };
  return res.render('cards', { ...defaults, ...options });
};

const validateFlashcard = (question, answer) => {
  const errors = [];
  
  if (!question || question.trim() === '') {
    errors.push('Question is required');
  } else if (question.length < 3) {
    errors.push('Question must be at least 3 characters');
  } else if (question.length > 500) {
    errors.push('Question cannot exceed 500 characters');
  }
  
  if (!answer || answer.trim() === '') {
    errors.push('Answer is required');
  } else if (answer.length < 3) {
    errors.push('Answer must be at least 3 characters');
  } else if (answer.length > 500) {
    errors.push('Answer cannot exceed 500 characters');
  }
  
  return {
    isValid: errors.length === 0,
    errors: errors.join(', '),
    sanitized: {
      question: question.trim(),
      answer: answer.trim()
    }
  };
};

export const getCards = async (req, res) => {
  try {
    const cards = await getAllCards();
    const currentIndex = req.query.index ? parseInt(req.query.index) : 0;
    const isFlipped = req.query.flipped === 'true';
    
    renderWithDefaults(res, { 
      flashcards: cards, 
      currentIndex, 
      isFlipped
    });
  } catch (err) {
    renderWithDefaults(res, {
      error: 'Failed to load flashcards: ' + err.message
    });
  }
};

export const showAddForm = async (req, res) => {
  try {
    const cards = await getAllCards();
    renderWithDefaults(res, {
      flashcards: cards,
      mode: 'add'
    });
  } catch (err) {
    renderWithDefaults(res, {
      error: 'Failed to load form: ' + err.message
    });
  }
};

export const addCard = async (req, res) => {
  try {
    const { question, answer } = req.body;
    const validation = validateFlashcard(question, answer);
    
    if (!validation.isValid) {
      const cards = await getAllCards();
      return renderWithDefaults(res, {
        flashcards: cards,
        mode: 'add',
        error: validation.errors,
        formData: { question, answer }
      });
    }
    
    await createCard(validation.sanitized.question, validation.sanitized.answer);
    res.redirect('/');
  } catch (err) {
    renderWithDefaults(res, {
      mode: 'add',
      error: 'Failed to add flashcard: ' + err.message,
      formData: req.body
    });
  }
};

export const showEditForm = async (req, res) => {
  try {
    const { id } = req.params;
    const cards = await getAllCards();
    const cardToEdit = await getCardById(id);
    
    if (!cardToEdit) {
      throw new Error('Card not found');
    }
    
    renderWithDefaults(res, {
      flashcards: cards,
      mode: 'edit',
      cardToEdit
    });
  } catch (err) {
    renderWithDefaults(res, {
      error: 'Failed to load edit form: ' + err.message
    });
  }
};

export const editCard = async (req, res) => {
  try {
    const { id } = req.params;
    const { question, answer } = req.body;
    const validation = validateFlashcard(question, answer);
    
    if (!validation.isValid) {
      const cards = await getAllCards();
      const cardToEdit = { id, question, answer };
      return renderWithDefaults(res, {
        flashcards: cards,
        mode: 'edit',
        cardToEdit,
        error: validation.errors
      });
    }
    
    await updateCard(id, validation.sanitized.question, validation.sanitized.answer);
    res.redirect('/');
  } catch (err) {
    const cards = await getAllCards();
    renderWithDefaults(res, {
      flashcards: cards,
      mode: 'edit',
      cardToEdit: { id: req.params.id, ...req.body },
      error: 'Failed to update flashcard: ' + err.message
    });
  }
};

export const removeCard = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteCard(id);
    res.redirect('/');
  } catch (err) {
    renderWithDefaults(res, {
      error: 'Failed to delete flashcard: ' + err.message
    });
  }
};