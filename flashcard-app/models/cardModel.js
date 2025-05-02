//Filename: ./models/cardModel.js
import pool from '../config/db.js';

export const getAllCards = async () => {
  try {
    const result = await pool.query('SELECT * FROM flashcards ORDER BY id');
    return result.rows;
  } catch (err) {
    console.error('Error getting all cards:', err);
    throw err;
  }
};

export const getCardById = async (id) => {
  try {
    const result = await pool.query('SELECT * FROM flashcards WHERE id = $1', [id]);
    return result.rows[0];
  } catch (err) {
    console.error('Error getting card by ID:', err);
    throw err;
  }
};

export const createCard = async (question, answer) => {
  try {
    const result = await pool.query(
      'INSERT INTO flashcards (question, answer) VALUES ($1, $2) RETURNING *',
      [question, answer]
    );
    return result.rows[0];
  } catch (err) {
    console.error('Error creating card:', err);
    throw err;
  }
};

export const updateCard = async (id, question, answer) => {
  try {
    const result = await pool.query(
      'UPDATE flashcards SET question = $1, answer = $2, updated_at = NOW() WHERE id = $3 RETURNING *',
      [question, answer, id]
    );
    return result.rows[0];
  } catch (err) {
    console.error('Error updating card:', err);
    throw err;
  }
};

export const deleteCard = async (id) => {
  try {
    await pool.query('DELETE FROM flashcards WHERE id = $1', [id]);
  } catch (err) {
    console.error('Error deleting card:', err);
    throw err;
  }
};
/*
export const searchCards = async (searchTerm) => {
  try {
    const result = await pool.query(
      `SELECT * FROM flashcards 
       WHERE question ILIKE $1 OR answer ILIKE $1 
       ORDER BY id`,
      [`%${searchTerm}%`]
    );
    return result.rows;
  } catch (err) {
    console.error('Error searching cards:', err);
    throw err;
  }
};*/
