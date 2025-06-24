import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let filePath = path.join(__dirname, '../data/genres.json');

// Let to change file from outside (to do tests)
export function setFilePath(newPath) {
    filePath = newPath;
}

export function getAllGenres() {
    const data = fs.readFileSync(filePath,'utf8');
    return JSON.parse(data);
};

export function getGenreById(id) {
    const genres = getAllGenres();
    return genres.find(g => g.id === id);
};

export function addGenre(genre) {
    const genres = getAllGenres();
    genre.id = genres.length ? Math.max(...genres.map(g => g.id)) + 1 : 1;
    genres.push(genre);
    fs.writeFileSync(filePath, JSON.stringify(genres, null, 2));
    return genre;
};

export function updateGenre(id, updatedGenre) {
    const genres = getAllGenres();
    const index = genres.findIndex(g => g.id === id);
    if (index === -1) return null;

    genres[index].name = updatedGenre.name;
    fs.writeFileSync(filePath, JSON.stringify(genres, null, 2));
    return genres[index];
};

export function deleteGenre(id) {
    const genres = getAllGenres();
    const genre = genres.find(g => g.id === id);
    if (genre === -1) return null;

    const newGenres = genres.filter(g => g.id !== id);
    fs.writeFileSync(filePath, JSON.stringify(newGenres, null, 2));
    return genre;
};