const axios = require('axios');

const openai = axios.create({
  baseURL: 'https://api.openai.com/v1/chat/completions',
  headers: {
    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    'Content-Type': 'application/json'
  }
});

exports.generateProductAnalysis = async (input) => {
  const {
    productName, price, origin, function: fn, features,
    audience, differential, image
  } = input;

  const systemPrompt = `
Eres un analista experto en dropshipping con enfoque orgánico. Tu tarea es evaluar productos siguiendo esta estructura de análisis:

- Evaluar: efecto wow, potencial viral, facilidad de marketing, valor percibido, rentabilidad esperada, facilidad logística, competencia, viabilidad de nicho o masivo.
- Calificar con estrellas (1 a 5) y justificación breve.
- Dar una calificación ponderada y veredicto operativo.
- Indicar rol estratégico, idea de video viral, riesgos en plataformas y nichos complementarios.
- Si solo hay imagen, analiza con base visual. No inventes datos.
`;

  const userPromptText = `
📦 ANÁLISIS DE PRODUCTO
🔹 Nombre: ${productName}
🔹 Precio estimado: ${price}
🔹 Origen: ${origin}
🔹 Función principal: ${fn}
🔹 Características clave: ${features?.join(', ')}
🔹 Público objetivo: ${audience}
🔹 Diferencial competitivo: ${differential}
`;

  const messages = [
    { role: 'system', content: systemPrompt },
    {
      role: 'user',
      content: image
        ? [
            { type: 'text', text: userPromptText },
            { type: 'image_url', image_url: { url: image } }
          ]
        : userPromptText
    }
  ];

  const response = await openai.post('', {
    model: 'gpt-4o',
    messages,
    temperature: 0.7
  });

  return response.data.choices[0].message.content;
};
