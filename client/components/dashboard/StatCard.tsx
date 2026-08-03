import { ReactNode } from "react";

export type StatCardVariant =
  | "total"
  | "reading"
  | "completed"
  | "wishlist";

interface StatCardProps {
  title: string;
  value: number;
  icon: ReactNode;
  variant: StatCardVariant;
}

const variants: Record<
  StatCardVariant,
  {
    card: string;
    icon: string;
  }
> = {
  total: {
    card: "bg-white border-lime-500",
    icon: "bg-indigo-600",
  },
  reading: {
    card: "bg-white border-lime-500",
    icon: "bg-blue-600",
  },
  completed: {
    card: "bg-white border-lime-500",
    icon: "bg-emerald-600",
  },
  wishlist: {
    card: "bg-white border-lime-500",
    icon: "bg-amber-600",
  },
};

export default function StatCard({
  title,
  value,
  icon,
  variant,
}: StatCardProps) {
  const style = variants[variant];

  return (
    <div
      className={`
        rounded-2xl
        border
        p-6
        transition-all
        duration-200
        hover:-translate-y-1
        hover:shadow-lg
        ${style.card}
      `}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            {value}
          </h2>
        </div>

        <div
          className={`
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-xl
            text-white
            ${style.icon}
          `}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}