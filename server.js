const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
const movieRoutes = require('./routes/movies');
const reviewRoutes = require('./routes/reviews');
const setupSwagger = require('./swagger');

const app = express();
const PORT = process.env.PORT || 8080;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Swagger documentation
setupSwagger(app);

// Routes
app.use('/movies', movieRoutes);
app.use('/reviews', reviewRoutes);

// Home route
app.get('/', (req, res) => {
  res.send('🎬 Movie Collection API is running. Use /movies, /reviews, or /api-docs endpoint.');
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📡 Movies endpoint: http://localhost:${PORT}/movies`);
  console.log(`📡 Reviews endpoint: http://localhost:${PORT}/reviews`);
  console.log(`📚 Swagger docs: http://localhost:${PORT}/api-docs`);
});