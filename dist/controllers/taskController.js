import Task from '../models/Task.js';
export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find().sort({ fechaCreacion: -1 });
        res.json(tasks);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener las tareas', error });
    }
};
export const createTask = async (req, res) => {
    try {
        const totalTasks = await Task.countDocuments();
        const codigo = `DEVS-${totalTasks + 1}`;
        const { titulo, descripcion, estado, prioridad, puntosHistoria } = req.body;
        const newTask = new Task({
            codigo,
            titulo,
            descripcion,
            estado,
            prioridad,
            puntosHistoria
        });
        await newTask.save();
        res.status(201).json(newTask);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al crear la tarea', error });
    }
};
export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedTask) {
            res.status(404).json({ message: 'Tarea no encontrada' });
            return;
        }
        res.json(updatedTask);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al actualizar la tarea', error });
    }
};
export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) {
            res.status(404).json({ message: 'Tarea no encontrada' });
            return;
        }
        res.json({ message: 'Tarea eliminada correctamente del tablero' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar la tarea', error });
    }
};
//# sourceMappingURL=taskController.js.map