import { InferSchemaType } from "mongoose";
import Book from "../models/book.model";

export type BookDocument = InferSchemaType<typeof Book>;

export interface BookResponseDto {
  id: string;
  title: string;
  author: string;
  status: "want-to-read" | "reading" | "completed";
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export const toBookDto = (book: any): BookResponseDto => ({
  id: book._id.toString(),
  title: book.title,
  author: book.author,
  status: book.status,
  tags: book.tags,
  createdAt: book.createdAt,
  updatedAt: book.updatedAt,
});