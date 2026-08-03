import api from "@/lib/axios";
import { ApiResponse } from "@/types/api";
import {
  Book,
  BookListResponse,
  BookQueryDto,
  CreateBookDto,
  UpdateBookDto,
} from "@/types/book";

export const bookService = {
  async getBooks(
    params?: Partial<BookQueryDto>
  ) {
    const response =
      await api.get<ApiResponse<BookListResponse>>(
        "/books",
        {
          params,
        }
      );

    return response.data;
  },

  async createBook(
    data: CreateBookDto
  ) {
    const response =
      await api.post<ApiResponse<Book>>(
        "/books",
        data
      );

    return response.data;
  },

  async updateBook(
    id: string,
    data: UpdateBookDto
  ) {
    const response =
      await api.patch<ApiResponse<Book>>(
        `/books/${id}`,
        data
      );

    return response.data;
  },

  async deleteBook(id: string) {
    const response =
      await api.delete<ApiResponse<null>>(
        `/books/${id}`
      );

    return response.data;
  },
};