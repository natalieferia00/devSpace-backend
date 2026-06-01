import { Schema, model } from 'mongoose';
const TaskSchema = new Schema({
    codigo: { type: String, required: true, unique: true },
    titulo: { type: String, required: true, trim: true },
    descripcion: { type: String, default: '' },
    estado: {
        type: String,
        enum: ['Por Hacer', 'En Progreso', 'En QA', 'Terminado'],
        default: 'Por Hacer'
    },
    prioridad: {
        type: String,
        enum: ['Baja', 'Media', 'Alta', 'Critica'],
        default: 'Media'
    },
    puntosHistoria: { type: Number, default: 1 },
    fechaCreacion: { type: Date, default: Date.now }
});
export default model('Task', TaskSchema);
//# sourceMappingURL=Task.js.map