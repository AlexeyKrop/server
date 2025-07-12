import {Router, Request, Response} from "express";
import {IAuthor} from "../interfaces";
import {authorsRepository} from "../../repositories";

export const authorsRoutes = Router();

authorsRoutes.get("/", async (_, res: Response<{authors: IAuthor[]}>) => {
    const authors = await authorsRepository.getAll();
    res.status(200).json({authors});
});

authorsRoutes.get("/:id", async (req: Request<{id: string}>, res: Response<{author: IAuthor} | {message: string}>) => {
    const {id} = req.params;
    const author = await authorsRepository.getById(Number(id));

    if (!author) {
        res.status(404).json({message: "Author not found"});
        return;
    }
    res.status(200).json({author});
});

authorsRoutes.post("/", async (req: Request<{}, {}, IAuthor>, res: Response<{author: IAuthor}>) => {
    const createdAuthor = await authorsRepository.create(req.body);
    res.status(201).json({author: createdAuthor});
});

authorsRoutes.put("/:id", async (req: Request<{id: string}, {}, Partial<IAuthor>>, res: Response<{author: IAuthor} | {message: string}>) => {
    const {id} = req.params;

    const updatedAuthor = await authorsRepository.update(Number(id), req.body);
    if (!updatedAuthor) {
        res.status(404).json({message: "Author not found"});
        return
    }
    res.status(200).json({author: updatedAuthor});
});


authorsRoutes.delete("/:id", async (req: Request<{id: string}>, res: Response<{message: string}>) => {
    const {id} = req.params;
    const deletedAuthor = await authorsRepository.delete(Number(id));
    if (!deletedAuthor || deletedAuthor === null) {
        res.status(404).json({message: "Author not found"});
        return;
    }
    res.status(200).json({message: "Author deleted"});
});
