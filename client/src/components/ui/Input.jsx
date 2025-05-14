import React from "react";

const Input = ({ type = "text", name, value, onChange, placeholder, ...props }) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full rounded-2xl border border-zinc-300 bg-white px-4 py-2 text-sm shadow-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
      {...props}
    />
  );
};

export { Input };
