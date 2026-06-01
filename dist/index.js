import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import taskRoutes from './routes/taskRoutes.js';
dotenv.config();
const app = express();
const allowedOrigins = [
    'http://localhost:5173',
    'http://127.0.0.1:5173'
];
if (process.env.FRONTEND_URL) {
    allowedOrigins.push(process.env.FRONTEND_URL.trim());
}
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin) || origin.startsWith('http://localhost:')) {
            callback(null, true);
        }
        else {
            callback(new Error('Bloqueado por la política de seguridad CORS de DevSpace'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use('/api/tasks', taskRoutes);
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
//# sourceMappingURL=index.js.map