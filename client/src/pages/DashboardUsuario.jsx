// src/pages/DashboardUsuario.jsx

import { useEffect, useState } from "react";
import { getUserWidgets } from "../services/dashboard.service";
import ReportWidget from "../components/ReportWidget";
import WidgetEditable from "../components/WidgetEditable";
import { useNavigate } from "react-router-dom";

export default function DashboardUsuario() {
  const [widgets, setWidgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const cargarWidgets = async () => {
    try {
      const data = await getUserWidgets();
      if (Array.isArray(data.widgets)) {
        setWidgets(data.widgets);
      }
    } catch (error) {
      console.error("Error al cargar widgets del usuario:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarWidgets();
  }, []);


    

    const handleAgregarWidget = () => {
    navigate("/editor-widgets");
    };


  return (
    <div className="p-4 space-y-6 text-gray-800 dark:text-white">
      <h1 className="text-2xl font-bold text-center">📈 Mis Reportes y Métricas</h1>

      {loading ? (
        <p className="text-center text-gray-500 dark:text-gray-300">Cargando widgets...</p>
      ) : widgets.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-300">
          No hay widgets configurados. Crea uno desde el Editor de Widgets.
        </p>
      ) : (
        <>        
            <div className="flex justify-end">
                <button
                    onClick={handleAgregarWidget}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow"
                >
                    ➕ Agregar nuevo widget
                </button>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {widgets.map((widget) => (
                <WidgetEditable key={widget.id}>
                <ReportWidget widget={widget} />
                </WidgetEditable>
            ))}
            </div>
        </>
      )}
    </div>
  );
}
