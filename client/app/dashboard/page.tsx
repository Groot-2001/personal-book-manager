"use client";

import {useEffect, useMemo, useState} from "react";
import Navbar from "@/components/dashboard/Navbar";
import StatsSection from "@/components/dashboard/StatsSection";
import BookGrid from "@/components/books/BookGrid";
import BookToolbar from "@/components/books/BookToolbar";
import BookModal from "@/components/books/BookModal";
import {useAuth} from "@/hooks/useAuth";
import {bookService} from "@/services/book.service";
import {getGreeting} from "@/utils/greeting";
import {Book, BookStatus} from "@/types/book";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import {toast} from "sonner";

export default function DashboardPage() {
  const {user} = useAuth();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<BookStatus | "">("");
  const [tag, setTag] = useState("");
  const [sortBy, setSortBy] = useState<"createdAt" | "title" | "author">("createdAt");
  const [openModal, setOpenModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function fetchBooks() {
    try {
      setLoading(true);

      const response = await bookService.getBooks({
        search: search || undefined,
        status: status || undefined,
        tag: tag || undefined,
        sortBy,
      });

      setBooks(response.data.books);
    } catch (error:any) {
      toast.error(
        error?.response?.data?.message ??
          "Unable to load books."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteBook() {
    if (!selectedBook) return;

    try {
      setDeleting(true);

      await bookService.deleteBook(selectedBook.id);
      toast.success("Book deleted successfully!");

      await fetchBooks();

      setOpenDeleteDialog(false);
      setSelectedBook(null);
    } catch (error) {
      toast.error("Unable to delete book.");
    } finally {
      setDeleting(false);
    }
  }

  useEffect(() => {
    fetchBooks();
  }, [search, status,tag, sortBy]);

  const stats = useMemo(
    () => ({
      total: books.length,

      reading: books.filter(
        (book) => book.status === "reading"
      ).length,

      completed: books.filter(
        (book) => book.status === "completed"
      ).length,

      wantToRead: books.filter(
        (book) => book.status === "want-to-read"
      ).length,
    }),
    [books]
  );

  const availableTags = useMemo(() => {
    return [
      ...new Set(
        books.flatMap((book) => book.tags)
      ),
    ].sort();
  }, [books]);

  const firstName = user?.name.split(" ")[0] ?? "";

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        <section>
          <h1 className="text-3xl font-bold text-slate-900">
            {getGreeting()}, {firstName} 👋
          </h1>

          <p className="mt-2 text-slate-500">
            Here's an overview of your reading progress.
          </p>
        </section>
        <StatsSection stats={stats} />
        <section className="space-y-6">
          <BookToolbar
            search={search}
            status={status}
            sortBy={sortBy}
            tag={tag}
            tags={availableTags}
            onTagChange={setTag}
            onSearchChange={setSearch}
            onStatusChange={setStatus}
            onSortChange={setSortBy}
            onAddBook={() => {
              setSelectedBook(null);
              setOpenModal(true);
            }}
          />

          <div className="flex items-center justify-between pl-[10px]">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                My Library
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {books.length}{" "}
                {books.length === 1 ? "book" : "books"}
              </p>
            </div>
          </div>

          <BookGrid
            books={books}
            loading={loading}
            onEdit={(book) => {
              setSelectedBook(book);
              setOpenModal(true);
            }}
            onDelete={(book) => {
              setSelectedBook(book);
              setOpenDeleteDialog(true);
            }}
          />
        </section>
        <BookModal
          open={openModal}
          mode={selectedBook ? "edit" : "create"}
          book={selectedBook ?? undefined}
          onClose={() => {
            setOpenModal(false);
            setSelectedBook(null);
          }}
          onSuccess={fetchBooks}
        />
        <ConfirmDialog
          open={openDeleteDialog}
          title="Delete Book"
          description={
            selectedBook
              ? `Are you sure you want to delete "${selectedBook.title}"? This action cannot be undone.`
              : ""
          }
          confirmText="Delete"
          cancelText="Cancel"
          loading={deleting}
          danger
          onCancel={() => {
            setOpenDeleteDialog(false);
            setSelectedBook(null);
          }}
          onConfirm={handleDeleteBook}
        />
      </main>
    </>
  );
}
