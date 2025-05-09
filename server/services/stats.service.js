exports.obtenerResumenMock = async (userId) => {
  return {
    totalAnalisis: 36,
    positivos: 18,
    negativos: 12,
    falsosPositivos: 3,
    falsosNegativos: 2,
    aciertos: 19,
    historico: [
      { fecha: "2025-05-01", analisis: 5 },
      { fecha: "2025-05-02", analisis: 7 },
      { fecha: "2025-05-03", analisis: 4 },
      { fecha: "2025-05-04", analisis: 6 },
      { fecha: "2025-05-05", analisis: 9 }
    ]
  };
};
