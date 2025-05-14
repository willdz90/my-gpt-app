import { Dialog } from "@headlessui/react";

export default function ColumnSettingsModal({ isOpen, onClose, columns, visibility, onChange }) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-xl bg-white dark:bg-zinc-900 p-6 space-y-4 shadow-lg">
          <Dialog.Title className="text-xl font-semibold">Personalizar columnas</Dialog.Title>
          <div className="space-y-2">
            {columns.map((col) =>
              col.id === "producto" ? null : (
                <div key={col.id} className="flex items-center justify-between">
                  <label className="text-sm capitalize">{col.id}</label>
                  <input
                    type="checkbox"
                    checked={visibility?.[col.id] ?? true}
                    onChange={(e) =>
                      onChange({ ...visibility, [col.id]: e.target.checked })
                    }
                    className="scale-125 accent-blue-600"
                  />
                </div>
              )
            )}
          </div>
          <div className="text-right">
            <button
              className="mt-4 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              onClick={onClose}
            >
              Cerrar
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
