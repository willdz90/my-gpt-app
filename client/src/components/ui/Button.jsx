export default function Button({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={
        "px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-sm " +
        "bg-zinc-800 text-white hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 " +
        className
      }
    >
      {children}
    </button>
  );
}
