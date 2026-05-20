const Review = require('../models/review');

// GET all reviews
const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate('movieId', 'title');
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET reviews by movie ID
const getReviewsByMovie = async (req, res) => {
  try {
    const reviews = await Review.find({ movieId: req.params.movieId })
      .populate('movieId', 'title')
      .select('comment -_id');
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST - Create a review
const createReview = async (req, res) => {
  try {
    const newReview = new Review(req.body);
    const savedReview = await newReview.save();
    res.status(201).json({ id: savedReview._id, message: 'Review created successfully' });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

// PUT - Update a review
const updateReview = async (req, res) => {
  try {
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.status(200).json({ message: 'Review updated successfully' });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

// DELETE - Delete a review
const deleteReview = async (req, res) => {
  try {
    const deletedReview = await Review.findByIdAndDelete(req.params.id);
    if (!deletedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllReviews,
  getReviewsByMovie,
  createReview,
  updateReview,
  deleteReview
};