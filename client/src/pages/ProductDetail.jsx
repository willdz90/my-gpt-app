import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAnalisisPorId } from "../services/product.service";
import ProductResult from "../components/ProductResult";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [respuesta, setRespuesta] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarProducto = async () => {
      const res = await getAnalisisPorId(id);
      if (res.success && res.data) {
        setProducto(res.data);

        if (res.data.respuestaGPT && typeof res.data.respuestaGPT === "string") {
          try {
            const json = JSON.parse(res.data.respuestaGPT);
            setRespuesta(json);
          } catch (error) {
            console.error("Error al parsear respuestaGPT:", error.message);
          }
        }
      }
      setLoading(false);
    };
    cargarProducto();
  }, [id]);

  if (loading) {
    return <div className="p-6 text-center text-gray-500">Cargando...</div>;
  }

  if (!producto) {
    return (
      <div className="p-6 text-center text-red-500">
        Error al cargar el producto.
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors shadow-sm"
        >
          <ArrowLeftIcon className="w-5 h-5 mr-2" />
          Volver
        </button>
        <h1 className="text-xl font-bold">{producto.input}</h1>
      </div>

      {respuesta?.tipo ? (
        <ProductResult result={respuesta} />
      ) : (
        <div className="text-gray-500">
          Este producto no tiene análisis disponible.
        </div>
      )}
    </div>
  );
}
