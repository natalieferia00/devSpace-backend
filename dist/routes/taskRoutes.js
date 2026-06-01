import { Router } from 'express';
// Añadimos el .js al controlador importado
import { getTasks, createTask, updateTask, deleteTask } from '../controllers/taskController.js';
const router = Router();
router.get('/', getTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
export default router;
//# sourceMappingURL=taskRoutes.js.map