import {Router, Request, Response} from "express";
import {IAuthor} from "../interfaces";
import {authorsRepository} from "../../repositiries";

export const authorsRoutes = Router();

authorsRoutes.get("/", (_, res: Response<{authors: IAuthor[]}>) => {
    const authors = authorsRepository.getAll();
    res.status(200).json({authors});
});

authorsRoutes.get("/:id", (req: Request<{id: string}>, res: Response<{author: IAuthor} | {message: string}>) => {
    const {id} = req.params;
    const author = authorsRepository.getById(Number(id));

    if (!author) {
        res.status(404).json({message: "Author not found"});
        return;
    }
    res.status(200).json({author});
});

authorsRoutes.post("/", (req: Request<{}, {}, IAuthor>, res: Response<{author: IAuthor}>) => {
    const newAuthor = req.body;
    const createdAuthor = authorsRepository.create(newAuthor);
    res.status(201).json({author: createdAuthor});
});

authorsRoutes.put("/:id", (req: Request<{id: string}, {}, Partial<IAuthor>>, res: Response<{author: IAuthor} | {message: string}>) => {
    const {id} = req.params;

    const updatedAuthor = authorsRepository.update(Number(id), req.body);
    if (!updatedAuthor) {
        res.status(404).json({message: "Author not found"});
        return
    }
    res.status(200).json({author: updatedAuthor});
});


authorsRoutes.delete("/:id", (req: Request<{id: string}>, res: Response<{message: string}>) => {
    const {id} = req.params;
    const deletedAuthor = authorsRepository.delete(Number(id));
    if (!deletedAuthor || deletedAuthor === null) {
        res.status(404).json({message: "Author not found"});
        return;
    }
    res.status(200).json({message: "Author deleted"});
});
