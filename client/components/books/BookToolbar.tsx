"use client";

import { BookStatus } from "@/types/book";
import {Search, Plus} from "lucide-react";

interface BookToolbarProps {
  search: string;
  status: BookStatus | "";
  sortBy: string;
  tag: string;
  tags: string[];
  onTagChange: (tag: string) => void;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: BookStatus | "") => void;
  onSortChange: (value: string) => void;

  onAddBook: () => void;
}

export default function BookToolbar({
  search,
  status,
  sortBy,
  tag,
  tags,
  onTagChange,
  onSearchChange,
  onStatusChange,
  onSortChange,
  onAddBook,
}: BookToolbarProps) {
  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="relative w-full lg:max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

        <input
          type="text"
          placeholder="Search books..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-lg border border-slate-300 py-2 pl-10 pr-4 text-sm outline-none transition focus:border-emerald-500"
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-500"
        >
          <option value="">All Status</option>

          <option value="want-to-read">Want to Read</option>

          <option value="reading">Reading</option>

          <option value="completed">Completed</option>
        </select>

        <select
          value={tag}
          onChange={(e) => onTagChange(e.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-500"
        >
          <option value="">All Tags</option>

          {tags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-500"
        >
          <option value="createdAt">Newest</option>

          <option value="title">Title</option>

          <option value="author">Author</option>
        </select>

        <button
          onClick={onAddBook}
          className="flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
        >
          <Plus className="h-4 w-4" />
          Add Book
        </button>
      </div>
    </section>
  );
}
