const express = require('express');
const cors = require('cors');
const session = require('express-session');
require('dotenv').config();

const connectDB = require('./config/db');
const passport = require('./config/passport');
const movieRoutes = require('./routes/movies');
const reviewRoutes = require('./routes/reviews');
const authRoutes = require('./routes/auth');
const setupSwagger = require('./swagger');

const app = express();
const PORT = process.env.PORT || 8080;

// Connect to MongoDB
connectDB();

// Trust proxy (needed for Render's HTTPS proxy)
app.set('trust proxy', 1);

// Middleware
app.use(cors());
app.use(express.json());

// Session configuration (required for Passport)
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', 
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}));

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Swagger documentation
setupSwagger(app);

// Routes
app.use('/movies', movieRoutes);
app.use('/reviews', reviewRoutes);
app.use('/auth', authRoutes);

// Home route
app.get('/', (req, res) => {
  res.send('🎬 Movie Collection API is running. Use /movies, /reviews, /auth/google, or /api-docs endpoint.');
});

// Simple profile route to show logged user
app.get('/profile', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
  res.json({
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    avatar: req.user.avatar
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📡 Movies: http://localhost:${PORT}/movies`);
  console.log(`📡 Reviews: http://localhost:${PORT}/reviews`);
  console.log(`🔐 Auth: http://localhost:${PORT}/auth/google`);
  console.log(`📚 Swagger: http://localhost:${PORT}/api-docs`);
});