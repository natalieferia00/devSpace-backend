import { Schema, model, Document } from 'mongoose';

export interface ITask extends Document {
  codigo: string;
  titulo: string;
  descripcion: string;
  estado: 'Por Hacer' | 'En Progreso' | 'En QA' | 'Terminado';
  prioridad: 'Baja' | 'Media' | 'Alta' | 'Critica';
  puntosHistoria: number;
  fechaCreacion: Date;
}

const TaskSchema = new Schema<ITask>({
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

export default model<ITask>('Task', TaskSchema);