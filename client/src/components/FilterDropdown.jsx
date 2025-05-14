// src/components/FilterDropdown.jsx

export default function FilterDropdown({ label, options, value, onChange, placeholder = "" }) {
  const formattedOptions = options.map(opt =>
    typeof opt === "string" ? { value: opt, label: opt || placeholder || "Todos" } : opt
  );

  return (
    <div className="w-full text-sm">
      {label && (
        <label className="block mb-1 text-zinc-700 dark:text-zinc-200 font-medium">
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded-md border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-800 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {placeholder && (
          <option value="">{placeholder}</option>
        )}
        {formattedOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
