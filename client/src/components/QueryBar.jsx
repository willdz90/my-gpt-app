import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function QueryBar({ query }) {
  const [expandido, setExpandido] = useState(false);

  return (
    <div className="flex-1">
      <div
        className="flex items-center justify-between cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-800 p-2 rounded"
        onClick={() => setExpandido(!expandido)}
        title="Ver consulta completa"
      >
        <div className="truncate text-sm text-zinc-700 dark:text-zinc-300 max-w-[90%]">
          {query || "SELECT ..."}
        </div>
        <div className="text-zinc-500">{expandido ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</div>
      </div>

      {expandido && (
        <pre className="mt-2 text-xs bg-zinc-100 dark:bg-zinc-800 p-3 rounded overflow-x-auto text-zinc-600 dark:text-zinc-300 whitespace-pre-wrap">
          {query || "SELECT * FROM analisis WHERE ..."}
        </pre>
      )}
    </div>
  );
}
