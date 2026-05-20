const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  director: {
    type: String,
    required: [true, 'Director is required'],
    trim: true
  },
  year: {
    type: Number,
    required: [true, 'Year is required'],
    min: [1888, 'Year must be 1888 or later'],
    max: [new Date().getFullYear(), 'Year cannot be in the future']
  },
  genre: {
    type: String,
    required: [true, 'Genre is required'],
    enum: ['Action', 'Comedy', 'Drama', 'Sci-Fi', 'Horror', 'Romance', 'Thriller', 'Animation', 'Documentary']
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [0, 'Rating must be between 0 and 10'],
    max: [10, 'Rating must be between 0 and 10']
  },
  duration: {
    type: Number,
    required: [true, 'Duration is required'],
    min: [1, 'Duration must be at least 1 minute']
  },
  language: {
    type: String,
    required: [true, 'Language is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [500, 'Description cannot exceed 500 characters']
  }
}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model('Movie', movieSchema);