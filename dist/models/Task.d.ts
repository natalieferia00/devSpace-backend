import { Document } from 'mongoose';
export interface ITask extends Document {
    codigo: string;
    titulo: string;
    descripcion: string;
    estado: 'Por Hacer' | 'En Progreso' | 'En QA' | 'Terminado';
    prioridad: 'Baja' | 'Media' | 'Alta' | 'Critica';
    puntosHistoria: number;
    fechaCreacion: Date;
}
declare const _default: import("mongoose").Model<ITask, {}, {}, {}, Document<unknown, {}, ITask, {}, import("mongoose").DefaultSchemaOptions> & ITask & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, ITask>;
export default _default;
//# sourceMappingURL=Task.d.ts.map