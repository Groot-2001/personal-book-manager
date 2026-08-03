"use client";

import {useEffect, useState} from "react";
import {X} from "lucide-react";
import { toast } from "sonner";
import BookForm from "./BookForm";
import {Book, BookStatus} from "@/types/book";
import {bookService} from "@/services/book.service";

interface BookModalProps {
  open: boolean;
  mode: "create" | "edit";
  book?: Book;
  onClose: () => void;
  onSuccess: () => Promise<void>;
}

interface BookFormData {
  title: string;
  author: string;
  status: BookStatus;
  tags: string;
}

const initialForm: BookFormData = {
  title: "",
  author: "",
  status: "want-to-read",
  tags: "",
};

export default function BookModal({
  open,
  mode,
  book,
  onClose,
  onSuccess,
}: BookModalProps) {
  const [form, setForm] =
    useState<BookFormData>(initialForm);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;

    if (mode === "edit" && book) {
      setForm({
        title: book.title,
        author: book.author,
        status: book.status,
        tags: book.tags.join(", "),
      });
    } else {
      setForm(initialForm);
    }
  }, [open, mode, book]);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        handleClose();
      }
    }

    if (open) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  function updateForm(
    field: keyof BookFormData,
    value: string
  ) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function handleClose() {
    setForm(initialForm);
    onClose();
  }

  async function handleSubmit() {
    try {
      setLoading(true);

      const payload = {
        title: form.title.trim(),
        author: form.author.trim(),
        status: form.status,
        tags: form.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      };

      if (mode === "create") {
        await bookService.createBook(payload);
        toast.success("Book created successfully!");
      } else if (book) {
        await bookService.updateBook(book.id, payload);
        toast.success("Book updated successfully!");
      }

      await onSuccess();

      handleClose();
    } catch (error) {
      console.error(error);
      toast.error("Unable to save book.");
    } finally {
      setLoading(false);
    }
  }

  if (!open) {
    return null;
  }

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <h2 className="text-xl font-semibold">
            {mode === "create" ? "Add Book" : "Edit Book"}
          </h2>

          <button
            onClick={handleClose}
            className="rounded-lg p-2 transition hover:bg-slate-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="px-6 py-5">
          <BookForm form={form} onChange={updateForm} />
        </div>
        <div className="flex justify-end gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4">
          <button
            onClick={handleClose}
            disabled={loading}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium transition hover:bg-slate-100 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? mode === "create"
                ? "Creating..."
                : "Updating..."
              : mode === "create"
              ? "Create Book"
              : "Update Book"}
          </button>
        </div>
      </div>
    </div>
  );
}
