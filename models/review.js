const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: [true, 'Movie ID is required']
  },
  user: {
    type: String,
    required: [true, 'User name is required'],
    trim: true
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [1, 'Rating must be between 1 and 5'],
    max: [5, 'Rating must be between 1 and 5']
  },
  comment: {
    type: String,
    required: [true, 'Comment is required'],
    maxlength: [300, 'Comment cannot exceed 300 characters']
  }
}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model('Review', reviewSchema);