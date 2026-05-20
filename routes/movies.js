/**
 * @swagger
 * components:
 *   schemas:
 *     Movie:
 *       type: object
 *       required:
 *         - title
 *         - director
 *         - year
 *         - genre
 *         - rating
 *         - duration
 *         - language
 *         - description
 *       properties:
 *         title:
 *           type: string
 *         director:
 *           type: string
 *         year:
 *           type: number
 *         genre:
 *           type: string
 *         rating:
 *           type: number
 *         duration:
 *           type: number
 *         language:
 *           type: string
 *         description:
 *           type: string
 */

/**
 * @swagger
 * /movies:
 *   get:
 *     summary: Get all movies
 *     responses:
 *       200:
 *         description: List of all movies
 *   post:
 *     summary: Create a new movie
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       201:
 *         description: Movie created successfully
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /movies/{id}:
 *   get:
 *     summary: Get a movie by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Movie found
 *       404:
 *         description: Movie not found
 *   put:
 *     summary: Update a movie
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
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       200:
 *         description: Movie updated successfully
 *       404:
 *         description: Movie not found
 *   delete:
 *     summary: Delete a movie
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Movie deleted successfully
 *       404:
 *         description: Movie not found
 */

const express = require('express');
const router = express.Router();
const {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie
} = require('../controllers/movieController');

router.get('/', getAllMovies);
router.get('/:id', getMovieById);
router.post('/', createMovie);
router.put('/:id', updateMovie);
router.delete('/:id', deleteMovie);

module.exports = router;