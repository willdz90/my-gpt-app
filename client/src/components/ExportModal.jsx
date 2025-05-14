// src/components/ExportModal.jsx
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import {
  DocumentDuplicateIcon,
  DocumentArrowDownIcon,
  ClipboardDocumentListIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export default function ExportModal({ isOpen, onClose, onSelect }) {
  const options = [
    {
      label: "Todos los productos",
      value: "todos",
      icon: DocumentArrowDownIcon,
    },
    {
      label: "Productos de la página actual",
      value: "pagina",
      icon: DocumentDuplicateIcon,
    },
    {
      label: "Productos seleccionados",
      value: "seleccionados",
      icon: ClipboardDocumentListIcon,
    },
  ];

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl bg-white dark:bg-bg-surface p-6 shadow-xl transition-all">
                <div className="flex items-center justify-between mb-4">
                  <Dialog.Title className="text-lg font-semibold text-gray-900 dark:text-text-primary">
                    Exportar productos
                  </Dialog.Title>
                  <button onClick={onClose} className="text-zinc-500 hover:text-red-500">
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-3">
                  {options.map(({ label, value, icon: Icon }) => (
                    <button
                      key={value}
                      onClick={() => onSelect(value)}
                      className="w-full flex items-center gap-3 px-4 py-2 rounded-md border border-zinc-300 dark:border-border-base bg-white dark:bg-ui-base text-zinc-800 dark:text-text-primary hover:bg-zinc-100 dark:hover:bg-bg-base transition"
                    >
                      <Icon className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                      <span className="flex-1 text-left">{label}</span>
                    </button>
                  ))}
                </div>

                <div className="mt-6 text-right">
                  <button
                    onClick={onClose}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Cancelar
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
