import {Router, Request, Response} from "express";

export const books = [
  { id: 101, title: '1984', authorId: 1, publishedYear: 1949, genres: ['dystopia'], pages: 328 },
  { id: 102, title: 'Animal Farm', authorId: 1, publishedYear: 1945, genres: ['satire'], pages: 144 },
  { id: 201, title: 'To Kill a Mockingbird', authorId: 2, publishedYear: 1960, genres: ['drama'], pages: 281 },
  { id: 301, title: 'Harry Potter and the Philosopher’s Stone', authorId: 3, publishedYear: 1997, genres: ['fantasy'], pages: 223 },
];

export const booksRoutes = Router();

booksRoutes.get("/books", (req: Request, res: Response) => {
    res.json({books});
});