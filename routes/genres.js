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
router.get('/', async (req, res) => {
    const genres = await getAllGenres();
    res.send(genres);
});

// get genre by ID
router.get('/:id', async (req, res) => {
    const genre = await getGenreById(parseInt(req.params.id));
    if (!genre) return res.status(404).send('Genre not found.');
    res.send(genre);
});

// create new genre
router.post('/', async (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await addGenre({ name: req.body.name });
    res.status(201).send(genre);
});

// update genre
router.put('/:id', async (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const updated = await updateGenre(parseInt(req.params.id), req.body);
    if (!updated) return res.status(404).send('Genre not found.');
    res.send(updated);
});

// delete genre
router.delete('/:id', async (req, res) => {
    const deleted = await deleteGenre(parseInt(req.params.id));
    if (!deleted) return res.status(404).send('Genre not found.');
    res.send(deleted);
});

export default router;