"use client";

import {
  BookMarked,
  BookOpen,
  CheckCircle2,
  Clock3,
} from "lucide-react";

import StatCard, {
  StatCardVariant,
} from "./StatCard";

interface Stats {
  total: number;
  reading: number;
  completed: number;
  wantToRead: number;
}

interface StatsSectionProps {
  stats: Stats;
}

export default function StatsSection({
  stats,
}: StatsSectionProps) {
  const cards: {
    title: string;
    value: number;
    variant: StatCardVariant;
    icon: React.ReactNode;
  }[] = [
    {
      title: "Total Books",
      value: stats.total,
      variant: "total",
      icon: (
        <BookOpen className="h-6 w-6" />
      ),
    },
    {
      title: "Reading",
      value: stats.reading,
      variant: "reading",
      icon: (
        <Clock3 className="h-6 w-6" />
      ),
    },
    {
      title: "Completed",
      value: stats.completed,
      variant: "completed",
      icon: (
        <CheckCircle2 className="h-6 w-6" />
      ),
    },
    {
      title: "Want to Read",
      value: stats.wantToRead,
      variant: "wishlist",
      icon: (
        <BookMarked className="h-6 w-6" />
      ),
    },
  ];

  return (
    <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <StatCard
          key={card.title}
          title={card.title}
          value={card.value}
          variant={card.variant}
          icon={card.icon}
        />
      ))}
    </section>
  );
}