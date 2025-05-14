// src/components/ReportWidget.jsx

import ChartPreview from "./ChartPreview";

export default function ReportWidget({ widget }) {
  if (!widget) {
    return (
      <div className="p-4 text-sm italic text-gray-500 dark:text-gray-300 border border-dashed rounded-lg">
        Widget no disponible.
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-zinc-800 border rounded-2xl shadow p-4 space-y-4">
      <h3 className="text-lg font-semibold text-zinc-800 dark:text-white">
        {widget.titulo || "Widget sin título"}
      </h3>
      <ChartPreview widget={widget} />
    </div>
  );
}
