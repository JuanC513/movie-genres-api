import {promises as fs} from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let filePath = path.join(__dirname, '../data/genres.json');

// Let to change file from outside (to do tests)
export function setFilePath(newPath) {
    filePath = newPath;
}

export async function getAllGenres() {
    const data = await fs.readFile(filePath,'utf8');
    return JSON.parse(data);
};

export async function getGenreById(id) {
    const genres = await getAllGenres();
    return genres.find(g => g.id === id);
};

export async function addGenre(genre) {
    const genres = await getAllGenres();
    genre.id = genres.length ? Math.max(...genres.map(g => g.id)) + 1 : 1;
    genres.push(genre);
    await fs.writeFile(filePath, JSON.stringify(genres, null, 2));
    return genre;
};

export async function updateGenre(id, updatedGenre) {
    const genres = await getAllGenres();
    const index = genres.findIndex(g => g.id === id);
    if (index === -1) return null;

    genres[index].name = updatedGenre.name;
    await fs.writeFile(filePath, JSON.stringify(genres, null, 2));
    return genres[index];
};

export async function deleteGenre(id) {
    const genres = await getAllGenres();
    const genre = genres.find(g => g.id === id);
    if (genre === -1) return null;

    const newGenres = genres.filter(g => g.id !== id);
    await fs.writeFile(filePath, JSON.stringify(newGenres, null, 2));
    return genre;
};