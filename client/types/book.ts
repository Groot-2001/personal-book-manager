export type BookStatus =
  | "want-to-read"
  | "reading"
  | "completed";

export interface Book {
  id: string;
  title: string;
  author: string;
  status: BookStatus;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateBookDto {
  title: string;
  author: string;
  status: BookStatus;
  tags: string[];
}

export type UpdateBookDto = Partial<CreateBookDto>;

export interface BookQueryDto {
  page?: number;
  limit?: number;
  search?: string;
  status?: BookStatus;
  sortBy?: "createdAt" | "title" | "author";
  order?: "asc" | "desc";
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface BookListResponse {
  books: Book[];
  pagination: Pagination;
}