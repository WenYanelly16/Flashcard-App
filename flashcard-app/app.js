//Filename: app.js
import express from 'express';
import bodyParser from 'body-parser';
import flashcardRoutes from './routes/flashcardRoutes.js';
import { getAllCards, createCard } from './models/cardModel.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', flashcardRoutes);

// ✅ Route to render EJS page and pass flashcards
app.get('/', async (req, res) => {
  try {
    const flashcards = await getAllCards();
    res.render('cards', { flashcards }); // <-- pass the variable here
  } catch (err) {
    res.status(500).send('Failed to load flashcards');
  }
});

// ✅ Form submit to add new flashcard
app.post('/add-card', async (req, res) => {
  const { question, answer } = req.body;
  try {
    await createCard(question, answer);
    res.redirect('/');
  } catch (err) {
    res.status(500).send('Failed to add flashcard');
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
