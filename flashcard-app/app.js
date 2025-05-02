//Filename: app.js
import express from 'express';
import bodyParser from 'body-parser';
import flashcardRoutes from './routes/flashcardRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Configuration
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware to ensure consistent variables
app.use((req, res, next) => {
  res.locals.defaultRenderVars = {
    mode: 'view',
    currentIndex: 0,
    isFlipped: false,
    cardToEdit: null,
    error: null
  };
  next();
});

// Routes
app.use('/', flashcardRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('cards', {
    ...res.locals.defaultRenderVars,
    flashcards: [],
    error: 'Something went wrong!'
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});