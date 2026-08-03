import { Book } from "@/types/book";
    import BookCard from "./BookCard";

    interface BookGridProps {
      books: Book[];
      loading: boolean;
      onEdit: (book: Book) => void;
      onDelete: (book: Book) => void;
    }

    export default function BookGrid({
      books,
      loading,
      onEdit,
      onDelete,
    }: BookGridProps) {
      if (loading) {
        return (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-64 animate-pulse rounded-2xl bg-slate-200"
              />
            ))}
          </div>
        );
      }

      if (books.length === 0) {
        return (
          <div className="flex min-h-[320px] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                No books yet 📚
              </h2>

              <p className="mt-2 text-slate-500">
                Add your first book to start building your library.
              </p>
            </div>
          </div>
        );
      }

      return (
        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </section>
      );
    }