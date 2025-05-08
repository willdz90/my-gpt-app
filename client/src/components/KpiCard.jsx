// src/components/KpiCard.jsx
export default function KpiCard({ title, value, icon }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded shadow p-4 flex flex-col items-center justify-center text-center">
      <div className="text-4xl mb-2">{icon}</div>
      <div className="text-sm text-gray-500 dark:text-gray-300">{title}</div>
      <div className="text-xl font-bold text-gray-800 dark:text-white">{value}</div>
    </div>
  );
}
