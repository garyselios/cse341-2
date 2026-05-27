/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       required:
 *         - movieId
 *         - user
 *         - rating
 *         - comment
 *       properties:
 *         movieId:
 *           type: string
 *           description: ID of the movie being reviewed
 *         user:
 *           type: string
 *           description: Name of the user writing the review
 *         rating:
 *           type: number
 *           description: Rating from 1 to 5
 *         comment:
 *           type: string
 *           description: Review comment (max 300 characters)
 */

/**
 * @swagger
 * /reviews:
 *   get:
 *     summary: Get all reviews
 *     responses:
 *       200:
 *         description: List of all reviews
 *   post:
 *     summary: Create a new review (requires authentication)
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       201:
 *         description: Review created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /reviews/{id}:
 *   put:
 *     summary: Update a review (requires authentication)
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       200:
 *         description: Review updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Review not found
 *   delete:
 *     summary: Delete a review (requires authentication)
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Review not found
 */

/**
 * @swagger
 * /reviews/movie/{movieId}:
 *   get:
 *     summary: Get reviews by movie ID
 *     parameters:
 *       - in: path
 *         name: movieId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of reviews for the specified movie
 *       404:
 *         description: No reviews found for this movie
 */

const express = require('express');
const router = express.Router();
const {
  getAllReviews,
  getReviewsByMovie,
  createReview,
  updateReview,
  deleteReview
} = require('../controllers/reviewController');
const isAuthenticated = require('../middleware/auth');

// Public routes (anyone can view)
router.get('/', getAllReviews);
router.get('/movie/:movieId', getReviewsByMovie);

// Protected routes (require authentication)
router.post('/', isAuthenticated, createReview);
router.put('/:id', isAuthenticated, updateReview);
router.delete('/:id', isAuthenticated, deleteReview);

module.exports = router;