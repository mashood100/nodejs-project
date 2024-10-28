"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TodoController_1 = require("../controllers/TodoController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// Apply authMiddleware to all routes in this router
router.use(auth_1.authMiddleware);
router.get('/', TodoController_1.getAllTodos);
router.get('/', TodoController_1.getTodoById);
router.post('/', TodoController_1.createTodo);
router.get('/:id', TodoController_1.getTodoById);
router.put('/:id', TodoController_1.updateTodo);
router.delete('/:id', TodoController_1.deleteTodo);
exports.default = router;
