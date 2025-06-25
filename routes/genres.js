import express from 'express';
import {
    getAllGenres,
    getGenreById,
    addGenre,
    updateGenre,
    deleteGenre
} from '../models/genre.js';
import { validateGenre } from '../validations/genre.js';

const router = express.Router();

// get all genres
router.get('/', (req, res) => {
    const genres = getAllGenres();
    res.send(genres);
});

// get genre by ID
router.get('/:id', (req, res) => {
    const genre = getGenreById(parseInt(req.params.id));
    if (!genre) return res.status(404).send('Genre not found.');
    res.send(genre);
});

// create new genre
router.post('/', (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = addGenre({ name: req.body.name });
    res.status(201).send(genre);
});

// update genre
router.put('/:id', (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const updated = updateGenre(parseInt(req.params.id), req.body);
    if (!updated) return res.status(404).send('Genre not found.');
    res.send(updated);
});

// delete genre
router.delete('/:id', (req, res) => {
    const deleted = deleteGenre(parseInt(req.params.id));
    if (!deleted) return res.status(404).send('Genre not found.');
    res.send(deleted);
});

export default router;