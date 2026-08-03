import { Pencil, Trash2 } from "lucide-react";

    import { Book } from "@/types/book";

    interface BookCardProps {
      book: Book;
      onEdit: (book: Book) => void;
      onDelete: (book: Book) => void;
    }

    const statusMap = {
      "want-to-read": {
        label: "Want to Read",
        className: "bg-amber-100 text-amber-700",
      },
      reading: {
        label: "Reading",
        className: "bg-blue-100 text-blue-700",
      },
      completed: {
        label: "Completed",
        className: "bg-emerald-100 text-emerald-700",
      },
    };

    export default function BookCard({
      book,
      onEdit,
      onDelete,
    }: BookCardProps) {
      const status = statusMap[book.status];

      return (
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <h2 className="truncate text-lg font-semibold text-slate-900">
                {book.title}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {book.author}
              </p>
            </div>

            <span className={`rounded-full px-3 py-1 text-xs font-medium ${status.className}`}>
              {status.label}
            </span>
          </div>

          {book.tags.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {book.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
            <span className="text-xs text-slate-500">
              Added {new Date(book.createdAt).toLocaleDateString()}
            </span>

            <div className="flex items-center gap-2">
              <button
                title="Edit book"
                onClick={() => onEdit(book)}
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-blue-600"
              >
                <Pencil className="h-4 w-4" />
              </button>

              <button
                title="Delete book"
                onClick={() => onDelete(book)}
                className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </article>
      );
    }