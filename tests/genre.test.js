import { promises as fs } from 'fs';
import path from 'path';
import { getAllGenres, getGenreById, addGenre, updateGenre, deleteGenre, setFilePath } from "../models/genre.js";

const testFilePath = path.resolve('data/genres.test.json');

beforeEach(() => {
  // Redirect the genre model to the json test file
  setFilePath(testFilePath);

  // Restore the file with basic data before each test
  const initialData = [
    { id: 1, name: "Acción" },
    { id: 2, name: "Comedia" },
    { id: 3, name: "Terror" }
  ];
  fs.writeFile(testFilePath, JSON.stringify(initialData, null, 2));
});

test('getAllGenres should return all genres', async () => {
  const genres = await getAllGenres();
  expect(genres.length).toBe(3);
});

test('getGenreById should return correct genre', async () => {
  const genre = await getGenreById(2);
  expect(genre).toEqual({ id: 2, name: "Comedia" });
});

test('addGenre should add a new genre', async () => {
  const newGenre = await addGenre({ name: "Drama" });
  expect(newGenre.id).toBe(4);
  const genres = await getAllGenres();
  expect(genres.length).toBe(4);
});

test('updateGenre should modify an existing genre', async () => {
  const updated = await updateGenre(1, { name: "Aventura" });
  expect(updated.name).toBe("Aventura");
});

test('deleteGenre should remove a genre', async () => {
  const deleted = await deleteGenre(3);
  expect(deleted.name).toBe("Terror");
  const genres = await getAllGenres();
  expect(genres.length).toBe(2);
});