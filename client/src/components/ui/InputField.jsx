import React from "react";

export default function InputField({
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
  name,
  required = false,
}) {
  return (
    <div className="space-y-1 text-sm w-full">
      {label && (
        <label htmlFor={name} className="block font-medium text-zinc-700 dark:text-zinc-200">
          {label}
        </label>
      )}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-3 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
