//Filename: ../controllers/cardController.js

import { getAllCards, getCardById, createCard, updateCard, deleteCard } from '../models/cardModel.js';

export const getCards = async (req, res) => {
    try {
        const cards = await getAllCards();
        res.json(cards);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getCard = async (req, res) => {
    try {
        const { id } = req.params;
        const card = await getCardById(id);
        if (card) {
            res.json(card);
        } else {
            res.status(404).json({ message: 'Card not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const addCard = async (req, res) => {
    try {
        const { question, answer } = req.body;
        const newCard = await createCard(question, answer);
        res.status(201).json(newCard);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const editCard = async (req, res) => {
    try {
        const { id } = req.params;
        const { question, answer } = req.body;
        const updatedCard = await updateCard(id, question, answer);
        res.json(updatedCard);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const removeCard = async (req, res) => {
    try {
        const { id } = req.params;
        await deleteCard(id);
        res.json({ message: 'Card deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
