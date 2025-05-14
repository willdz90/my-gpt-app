import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

export default function Pagination({ total, current, setPage }) {
  const pages = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <div className="flex justify-center items-center gap-2 mt-6">
      <button
        onClick={() => setPage(current - 1)}
        disabled={current === 1}
        className="p-2 rounded-full bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 transition"
      >
        <ChevronLeftIcon className="w-4 h-4 text-zinc-700 dark:text-white" />
      </button>
      {pages.map((n) => (
        <button
          key={n}
          onClick={() => setPage(n)}
          className={`w-8 h-8 rounded-full text-sm font-medium transition ${
            current === n
              ? "bg-zinc-800 text-white dark:bg-white dark:text-zinc-900"
              : "bg-zinc-100 text-zinc-700 dark:bg-zinc-700 dark:text-white"
          }`}
        >
          {n}
        </button>
      ))}
      <button
        onClick={() => setPage(current + 1)}
        disabled={current === total}
        className="p-2 rounded-full bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 transition"
      >
        <ChevronRightIcon className="w-4 h-4 text-zinc-700 dark:text-white" />
      </button>
    </div>
  );
}
