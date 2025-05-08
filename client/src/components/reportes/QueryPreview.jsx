export default function QueryPreview({ querySQL }) {
    return (
      <textarea
        value={querySQL}
        readOnly
        className="w-full px-3 py-2 font-mono border rounded resize-none bg-white dark:bg-gray-800 dark:text-white"
        rows={1}
        onFocus={(e) => e.target.rows = 5}
        onBlur={(e) => e.target.rows = 1}
      />
    );
  }
  