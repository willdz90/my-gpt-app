// src/mocks/mockResults.js
const mockResults = {
    positivo: {
      tipo: "positivo",
      criterios: {
        efectoWow: 4,
        viralidad: 5,
        marketing: 5,
        rentabilidad: 4,
        valorPercibido: 4,
        logistica: 4,
        competencia: 3,
        nicho: 5,
      },
      puntuacion: 88,
      veredicto:
        "Este producto cumple con los requisitos clave para triunfar en un entorno de marketing orgánico. Tiene un fuerte efecto wow visual, gran potencial de grababilidad para redes sociales, y permite contenidos creativos con bajo coste de producción.",
      recomendacion: "Este producto sí debe pasar al análisis de buyer persona.",
      rol: {
        tipo: "impulso",
        descripcion: "usado principalmente para disparar compras impulsivas de bajo riesgo",
      },
      videoViral: {
        estilo: "unboxing",
        guion: "Una persona abre el paquete, se sorprende por el diseño, lo prueba en cámara y se nota el beneficio inmediato.",
      },
      riesgos: {
        tiktok: true,
        meta: true,
        amazon: false,
      },
      ventaCruzada: ["Base magnética", "Accesorio premium"],
      nichosSecundarios: ["hogar inteligente", "regalos tecnológicos"],
      buyerPersona: {
        nombre: "Techie Creativa",
        edad: "18–25",
        intereses: ["gadgets", "organización", "minimalismo"],
        redes: ["TikTok", "Instagram"],
        motivacion: "Innovación y estilo útil",
      },
      fichaPublicitaria: {
        porQueFunciona: "Sorprende y es funcional",
        problema: "Desorden visual o ineficiencia en el hogar",
        diferencial: "Diseño + practicidad",
        viral: "sí – alta grababilidad en redes",
        nombreViral: "ClipMag™",
      },
    },
  
    neutro: {
      tipo: "neutro",
      criterios: {
        efectoWow: 2,
        viralidad: 2,
        marketing: 3,
        rentabilidad: 3,
        valorPercibido: 3,
        logistica: 4,
        competencia: 3,
        nicho: 4,
      },
      puntuacion: 63,
      veredicto:
        "Este producto podría ser funcional si se dirige a un nicho específico con mensajes emocionales fuertes. No tiene suficiente efecto wow o viralidad para explotar redes orgánicamente de forma masiva.",
      recomendacion:
        "Este producto puede pasar al análisis de buyer persona solo si se trabaja un enfoque de nicho bien definido.",
    },
  
    negativo: {
      tipo: "negativo",
      criterios: {
        efectoWow: 1,
        viralidad: 1,
        marketing: 2,
        rentabilidad: 2,
        valorPercibido: 2,
        logistica: 3,
        competencia: 4,
        nicho: 2,
      },
      puntuacion: 38,
      veredicto:
        "Este producto no genera interés inmediato, carece de elementos visuales virales, y tiene un alto nivel de competencia sin diferenciador claro.",
      recomendacion:
        "Este producto no debe pasar al análisis de buyer persona ni ser incluido en catálogo de dropshipping orgánico.",
    },
  };
  
  export default mockResults;
  