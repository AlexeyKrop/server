import type { Author as PrismaAuthor } from '@prisma/client'
import { prisma } from '../../prisma';
import {IAuthor} from "../../routes/interfaces";


export const authorsRepository = {
    getAll: async (): Promise<IAuthor[]> => {
        const raw = await prisma.author.findMany();
        return raw.map(mapAuthor);
      },

      getById: async (id: number): Promise<IAuthor | null> => {
        const raw = await prisma.author.findUnique({ where: { id } });
        return raw ? mapAuthor(raw) : null;
      },

      create: async (data: Omit<IAuthor, 'id'>): Promise<IAuthor> => {
        const raw = await prisma.author.create({ data });
        return mapAuthor(raw);
      },

    update: async (id: number, data: Partial<IAuthor>): Promise<IAuthor | null> => {
        const raw = await prisma.author.update({
            where: {id},
            data,
        });

        return mapAuthor(raw);
    },

    delete: async (id: number): Promise<boolean | null> => {
        await prisma.author.delete({ where: { id } });
        return true;
    }
}

export function mapAuthor(author: PrismaAuthor): IAuthor {
    return {
      id:         author.id,
      firstName:  author.firstName,
      lastName:   author.lastName,
      birthYear:  author.birthYear ?? null,
      country:    author.country ?? null,
    };
  }