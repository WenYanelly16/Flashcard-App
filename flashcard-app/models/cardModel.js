//Filename: ./models/cardModel.js

import pool from '../config/db.js';

export const getAllCards = async () => {
    const result = await pool.query('SELECT * FROM flashcards');
    return result.rows;
};

export const getCardById = async (id) => {
    const result = await pool.query('SELECT * FROM flashcards WHERE id = $1', [id]);
    return result.rows[0];
};

export const createCard = async (question, answer) => {
    const result = await pool.query(
        'INSERT INTO flashcards (question, answer) VALUES ($1, $2) RETURNING *',
        [question, answer]
    );
    return result.rows[0];
};

export const updateCard = async (id, question, answer) => {
    const result = await pool.query(
        'UPDATE flashcards SET question = $1, answer = $2 WHERE id = $3 RETURNING *',
        [question, answer, id]
    );
    return result.rows[0];
};

export const deleteCard = async (id) => {
    await pool.query('DELETE FROM flashcards WHERE id = $1', [id]);
};
