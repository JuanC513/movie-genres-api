import { promises as fs } from 'fs';
import path from 'path';
import request from 'supertest';
import app from '../app.js';
import { setFilePath } from '../models/genre.js';

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

describe('GET /api/genres', () => {
    it('should return a list of genres', async () => {
        const res = await request(app).get('/api/genres');

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body).toEqual([
            { id: 1, name: "Acción" },
            { id: 2, name: "Comedia" },
            { id: 3, name: "Terror" }
        ]);
        expect(res.body.length).toBe(3);
    });
});

describe('GET /api/genres/:id', () => {
    it('should return the genre with the given ID', async () => {
        const res = await request(app).get('/api/genres/2');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ id: 2, name: "Comedia" });
    });

    it('should return 404 if genre not found', async () => {
        const res = await request(app).get('/api/genres/999');
        expect(res.statusCode).toBe(404);
    });
});

describe('POST /api/genres', () => {
    it('should create and return a new genre', async () => {
        const res = await request(app)
        .post('/api/genres')
        .send({ name: "Drama" });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body).toMatchObject({ name: "Drama" });

        // verify it was saved
        const all = JSON.parse(await fs.readFile(testFilePath));
        expect(all.length).toBe(4);
    });

    it('should return 400 if name is too short', async () => {
        const res = await request(app)
        .post('/api/genres')
        .send({ name: "A" });

        expect(res.statusCode).toBe(400);
    });
});

describe('PUT /api/genres/:id', () => {
    it('should update the genre with valid data', async () => {
        const res = await request(app)
        .put('/api/genres/1')
        .send({ name: "Acción épica" });

        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBe("Acción épica");

        const data = JSON.parse(await fs.readFile(testFilePath));
        expect(data[0].name).toBe("Acción épica");
    });

    it('should return 404 if genre not found', async () => {
        const res = await request(app)
        .put('/api/genres/999')
        .send({ name: "Nuevo" });

        expect(res.statusCode).toBe(404);
    });

    it('should return 400 if validation fails', async () => {
        const res = await request(app)
        .put('/api/genres/1')
        .send({ name: "" });

        expect(res.statusCode).toBe(400);
    });
});

describe('DELETE /api/genres/:id', () => {
    it('should delete the genre and return it', async () => {
        const res = await request(app).delete('/api/genres/2');
        expect(res.statusCode).toBe(200);
        expect(res.body.id).toBe(2);

        const all = JSON.parse(await fs.readFile(testFilePath));
        expect(all.length).toBe(2);
        expect(all.find(g => g.id === 2)).toBeUndefined();
    });

    it('should return 404 if genre not found', async () => {
        const res = await request(app).delete('/api/genres/999');
        expect(res.statusCode).toBe(404);
    });
});