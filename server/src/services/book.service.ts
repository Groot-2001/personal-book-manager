import Book from "../models/book.model";
import { FilterQuery } from "mongoose";
import { BookQueryDto } from "../dto/book-query.dto";
import { toBookDto } from "../dto/book.dto";
import { getPagination } from "../utils/pagination";
import { ApiError } from "../utils/ApiError";
import { createBookSchema, updateBookSchema } from "../validators/book.validator";
import { z } from "zod";

export type CreateBookInput = z.infer<typeof createBookSchema>;
export type UpdateBookInput = z.infer<typeof updateBookSchema>;

export class BookService {
  async createBook(userId: string, data: CreateBookInput) {
    const book = await Book.create({
      ...data,
      user: userId,
    });

    return book;
  }

  async getBooks(
    userId: string,
    query: BookQueryDto
  ) {
    const {
      page = 1,
      limit = 10,
      search,
      status,
      tag,
      sortBy,
      order,
    } = query;


    const filter: FilterQuery<typeof Book> = {
      user: userId
    };

    if (status) {
      filter.status = status;
    }

    if (tag) {
      filter.tags = tag;
    }

    if (search) {
      filter.$or = [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
        {
          author: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    const skip = (page - 1) * limit;

    const sort: Record<string, 1 | -1> = {
      [sortBy]: order === "asc" ? 1 : -1,
    };

    const [books, total] = await Promise.all([
      Book.find(filter)
      .lean()
      .sort(sort)
      .skip(skip)
      .limit(limit),

    Book.countDocuments(filter),
    ]);

    return {
      books: books.map(toBookDto),

      pagination: getPagination(page, limit, total),
    };
  }

  async getBookById(
    userId: string,
    bookId: string
  ) {

    const book = await Book.findOne({
      _id: bookId,
      user: userId
    }).lean();

    if (!book) {
      throw new ApiError(
        404,
        "Book not found"
      );
    }

    return toBookDto(book);

  }

  async updateBook(
    userId: string,
    bookId: string,
    data: Partial<UpdateBookInput>
  ) {
    const book = await Book.findOneAndUpdate(
      {
        _id: bookId,
        user: userId
      },
      data,
      {
        new: true,
        runValidators: true
      }
    );

    if (!book) {
      throw new ApiError(
        404,
        "Book not found"
      );
    }

    return toBookDto(book);

  }

  async deleteBook(userId: string, bookId: string) {
    const book = await Book.findOneAndDelete({
      _id: bookId,
      user: userId,
    });
  
    if (!book) {
      throw new ApiError(404, "Book not found");
    }
  }
}

export const bookService = new BookService();