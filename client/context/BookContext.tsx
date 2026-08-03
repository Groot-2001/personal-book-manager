"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { bookService } from "@/services/book.service";

import {
  Book,
  BookQueryDto,
  CreateBookDto,
  Pagination,
  UpdateBookDto,
} from "@/types/book";

interface BookContextType {
  books: Book[];
  loading: boolean;
  pagination: Pagination | null;

  fetchBooks: (
    params?: Partial<BookQueryDto>
  ) => Promise<void>;

  createBook: (
    data: CreateBookDto
  ) => Promise<void>;

  updateBook: (
    id: string,
    data: UpdateBookDto
  ) => Promise<void>;

  deleteBook: (
    id: string
  ) => Promise<void>;
}

const BookContext =
  createContext<BookContextType | null>(
    null
  );

export function BookProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [books, setBooks] =
    useState<Book[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [pagination, setPagination] =
    useState<Pagination | null>(null);

  async function fetchBooks(
    params?: Partial<BookQueryDto>
  ) {
    try {
      setLoading(true);

      const response =
        await bookService.getBooks(params);

      setBooks(response.data.books);

      setPagination(
        response.data.pagination
      );
    } finally {
      setLoading(false);
    }
  }

  async function createBook(
    data: CreateBookDto
  ) {
    await bookService.createBook(data);

    await fetchBooks();
  }

  async function updateBook(
    id: string,
    data: UpdateBookDto
  ) {
    await bookService.updateBook(
      id,
      data
    );

    await fetchBooks();
  }

  async function deleteBook(id: string) {
    await bookService.deleteBook(id);

    await fetchBooks();
  }

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <BookContext.Provider
      value={{
        books,
        loading,
        pagination,
        fetchBooks,
        createBook,
        updateBook,
        deleteBook,
      }}
    >
      {children}
    </BookContext.Provider>
  );
}

export function useBooks() {
  const context =
    useContext(BookContext);

  if (!context) {
    throw new Error(
      "useBooks must be used within BookProvider"
    );
  }

  return context;
}