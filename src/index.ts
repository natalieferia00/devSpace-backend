import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import taskRoutes from './routes/taskRoutes.js';

dotenv.config();

const app = express();

// 1. LISTA BLANCA DE ORÍGENES (Locales y Producción Fijos)
const allowedOrigins = [
  'http://localhost:5173', 
  'http://127.0.0.1:5173',
  'https://dev-space-frontend-sns5.vercel.app' // <-- Forzamos tu URL de Vercel aquí
];

if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL.trim());
}

// 2. CONFIGURACIÓN COMPACTA Y SEGURA DE CORS
app.use(cors({
  origin: (origin, callback) => {
    // Si no hay origen (Postman) o está en la lista permitida o es localhost, damos luz verde
    if (!origin || allowedOrigins.includes(origin) || origin.startsWith('http://localhost:')) {
      callback(null, true);
    } else {
      // Devolvemos false de forma limpia en lugar de romper el hilo con un "new Error"
      callback(null, false);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(express.json());

// Rutas de la API
app.use('/api/tasks', taskRoutes);

// 3. PUERTO Y CONEXIÓN
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('❌ Error crítico: La variable MONGO_URI no está definida en el entorno.');
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('🚀 ¡Conexión exitosa a MongoDB Atlas!');
    app.listen(Number(PORT), '0.0.0.0', () => {
      console.log(`📡 Servidor operando con éxito en el puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Error crítico al conectar a MongoDB:', error);
  });