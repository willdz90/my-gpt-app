export default function Skeleton({ className = "" }) {
  return (
    <div className={`animate-pulse bg-gray-300 dark:bg-zinc-700 rounded ${className}`} />
  );
}
