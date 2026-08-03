"use client";

import { BookStatus } from "@/types/book";

interface BookFormData {
  title: string;
  author: string;
  status: BookStatus;
  tags: string;
}

interface BookFormProps {
  form: BookFormData;

  onChange: (
    field: keyof BookFormData,
    value: string
  ) => void;
}

export default function BookForm({
  form,
  onChange,
}: BookFormProps) {
  return (
    <div className="space-y-5">
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Title
        </label>

        <input
          type="text"
          value={form.title}
          onChange={(e) =>
            onChange("title", e.target.value)
          }
          className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none transition focus:border-emerald-500"
          placeholder="Clean Code"
        />
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Author
        </label>

        <input
          type="text"
          value={form.author}
          onChange={(e) =>
            onChange("author", e.target.value)
          }
          className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none transition focus:border-emerald-500"
          placeholder="Robert C. Martin"
        />
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Status
        </label>

        <select
          value={form.status}
          onChange={(e) =>
            onChange("status", e.target.value)
          }
          className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none transition focus:border-emerald-500"
        >
          <option value="want-to-read">
            Want to Read
          </option>

          <option value="reading">
            Reading
          </option>

          <option value="completed">
            Completed
          </option>
        </select>
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Tags
        </label>

        <input
          type="text"
          value={form.tags}
          onChange={(e) =>
            onChange("tags", e.target.value)
          }
          placeholder="programming, clean-code"
          className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none transition focus:border-emerald-500"
        />

        <p className="mt-2 text-xs text-slate-500">
          Separate multiple tags using commas.
        </p>
      </div>
    </div>
  );
}