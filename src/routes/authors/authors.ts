import {Router, Request, Response} from "express";
import {IAuthor} from "../interfaces";

export const authors = [
    {id: 1, firstName: 'George', lastName: 'Orwell', birthYear: 1903, country: 'UK'},
    {id: 2, firstName: 'Harper', lastName: 'Lee', birthYear: 1926, country: 'USA'},
    {id: 3, firstName: 'J. K.', lastName: 'Rowling', birthYear: 1965, country: 'UK'},
];

export const authorsRoutes = Router();

authorsRoutes.get("/", (req: Request, res: Response<{authors: IAuthor[]}>) => {
    res.status(200).json({authors});
});

authorsRoutes.get("/:id", (req: Request<{id: string}>, res: Response<{ author: IAuthor } | { message: string }>) => {
    const { id } = req.params;
    const author = authors.find((author) => author.id === Number(id));
    if (!author) {
        res.status(404).json({ message: "Author not found" });
        return;
    }
    res.status(200).json({ author });
});

authorsRoutes.post("/", (req: Request<{}, {}, IAuthor>, res: Response<{ author: IAuthor }>) => {
    const newAuthor = req.body;
    authors.push(newAuthor);
    res.status(201).json({ author: newAuthor });
});

authorsRoutes.put("/:id", (req: Request<{id: string}, {}, Partial<IAuthor>>, res: Response<{author: IAuthor} | {message: string}>) => {
    const {id} = req.params;
    const author = authors.find((author) => author.id === Number(id));
    if (!author) {
       res.status(404).json({message: "Author not found"});
       return
    }
    const updatedAuthor = {...author, ...req.body};
    res.status(200).json({author: updatedAuthor});
});


authorsRoutes.delete("/:id", (req: Request<{id: string}>, res: Response<{message: string}>) => {
    const {id} = req.params;
    const index = authors.findIndex((author) => author.id === Number(id));
    if (index === -1) {
        res.status(404).json({message: "Author not found"});
        return;
    }
    authors.splice(index, 1);
    res.status(200).json({message: "Author deleted"});
});
