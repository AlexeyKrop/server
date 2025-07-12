import {IAuthor} from "../../routes/interfaces";
const authors = [
    {id: 1, firstName: 'George', lastName: 'Orwell', birthYear: 1903, country: 'UK'},
    {id: 2, firstName: 'Harper', lastName: 'Lee', birthYear: 1926, country: 'USA'},
    {id: 3, firstName: 'J. K.', lastName: 'Rowling', birthYear: 1965, country: 'UK'},
];

export const authorsRepository = {
    getAll: (): IAuthor[] => {
        return authors;
    },
    getById: (id: number): IAuthor | undefined => {
        return authors.find((author) => author.id === id);
    },
    create: (author: IAuthor): IAuthor => {
        authors.push(author);
        return author;
    },
    update: (id: number, author: Partial<IAuthor>): IAuthor | null => {
        const index = authors.findIndex((author) => author.id === id);
        if (index === -1) {
            return null;
        }
        authors[index] = {...authors[index], ...author};
        return authors[index];
    },
    delete: (id: number): boolean | null => {
        const index = authors.findIndex((author) => author.id === id);
        if (index === -1) {
            return null;
        }
        authors.splice(index, 1);
        return true;
    }
}