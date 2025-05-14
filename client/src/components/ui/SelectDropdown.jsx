import React from "react";

export default function SelectDropdown({
  label,
  value,
  onChange,
  options = [],
  name,
}) {
  return (
    <div className="space-y-1 text-sm w-full">
      {label && (
        <label htmlFor={name} className="block font-medium text-zinc-700 dark:text-zinc-200">
          {label}
        </label>
      )}
      <select
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
