import express from 'express';
import { getAllTodos, createTodo, updateTodo, deleteTodo, getTodoById } from '../controllers/TodoController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

// Apply authMiddleware to all routes in this router
router.use(authMiddleware);

router.get('/', getAllTodos);
router.get('/', getTodoById);

router.post('/', createTodo);
router.get('/:id', getTodoById);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);

export default router;