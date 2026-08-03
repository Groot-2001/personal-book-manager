export interface BookQueryDto {
    page: number;
    limit: number;
    search?: string;
    status?: "want-to-read" | "reading" | "completed";
    tag?: string;
    sortBy: "createdAt" | "title" | "author";
    order: "asc" | "desc";
  }