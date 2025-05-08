# 🧠 my-gpt-app – Analista de Productos Ganadores con IA

Bienvenido a **my-gpt-app**, una plataforma web que analiza productos de ecommerce (especialmente dropshipping) usando inteligencia artificial personalizada con GPT. Esta app evalúa la viabilidad comercial de productos mediante texto, imagen o feedback y devuelve un análisis completo, creativo y estratégico.

---

## 🚀 ¿Qué hace esta app?

- 📦 Analiza productos mediante GPT (con o sin imagen)
- 📊 Devuelve análisis detallados con plantillas profesionales
- ⭐ Integra sistema de puntuación automática por criterios (Wow, viralidad, logística, etc.)
- 🧠 Aprende del feedback del usuario para mejorar respuestas
- 📈 Muestra métricas en widgets personalizables al estilo Shopify
- 🧾 Guarda historial, estadísticas y feedback de todos los análisis
- 🔌 Prepara integración con AliExpress y más
- 🔐 Control de roles (`admin`, `user`, `api_client`)
- 🛡️ Seguridad robusta con JWT, Helmet, Rate Limit y CORS

---

## 🧩 Tech Stack

- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **Base de datos:** MongoDB
- **Autenticación:** JWT
- **AI:** OpenAI API (GPT-4o)

---

## 📂 Estructura del Proyecto

```
/client            # React frontend
/server
  /routes          # Rutas API
  /controllers     # Lógica de negocio
  /services        # GPT, email, integración AliExpress, etc.
  /models          # Esquemas MongoDB
  /middleware      # Seguridad y validaciones
  /utils           # Métricas, logs, helpers
  /logs            # Winston logger
```

---

## 🧪 ¿Cómo lo ejecuto localmente?

1. Clona el repositorio  
   `git clone https://github.com/willdz90/my-gpt-app.git`

2. Instala dependencias  
   ```
   cd server && npm install
   cd ../client && npm install
   ```

3. Crea tu archivo `.env` con las siguientes variables:  
   ```
   GPT_API_KEY=your_openai_key
   MONGO_URI=your_mongo_uri
   JWT_SECRET=your_jwt_secret
   ```

4. Inicia el backend  
   `cd server && npm run dev`

5. Inicia el frontend  
   `cd client && npm run dev`

---

## 📘 Documentación técnica

📄 [Manual Técnico Completo (Word)](./docs/MANUAL_TECNICO_COMPLETO_CON_TODO.docx)  
Incluye: arquitectura, prompts, seguridad, widgets, métricas, reglas del bot y más.

---

## ✨ ¿Qué viene después?

- 🖼️ Análisis por imagen
- 📤 Exportación de análisis a PDF
- 📥 Integraciones con Notion, Google Sheets
- 🤖 Plugins con GPTs externos o embebidos

---

## 🧑‍💻 Autor

**Will DZ**  
Emprendedor, programador y marketer con visión SaaS.  
📍 Valledupar, Colombia

---

> “No es solo una app de IA. Es un analista digital con cerebro, estructura y propósito.”  
> — *Built by Will.*
