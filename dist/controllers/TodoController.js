"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.createTodo = exports.getTodoById = exports.getAllTodos = void 0;
const Todo_1 = __importDefault(require("../models/Todo"));
const getAllTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield Todo_1.default.find({ user: req.userId });
        res.json(todos);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching todos', error });
    }
});
exports.getAllTodos = getAllTodos;
const getTodoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const todo = yield Todo_1.default.findOne({ _id: id, user: req.userId });
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json(todo);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching todo', error });
    }
});
exports.getTodoById = getTodoById;
const createTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newTodo = yield Todo_1.default.create(Object.assign(Object.assign({}, req.body), { user: req.userId }));
        res.status(201).json(newTodo);
    }
    catch (error) {
        res.status(400).json({ message: 'Error creating todo', error });
    }
});
exports.createTodo = createTodo;
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedTodo = yield Todo_1.default.findOneAndUpdate({ _id: req.params.id, user: req.userId }, req.body, { new: true });
        if (!updatedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json(updatedTodo);
    }
    catch (error) {
        res.status(400).json({ message: 'Error updating todo', error });
    }
});
exports.updateTodo = updateTodo;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedTodo = yield Todo_1.default.findOneAndDelete({ _id: req.params.id, user: req.userId });
        if (!deletedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.status(204).send();
    }
    catch (error) {
        res.status(400).json({ message: 'Error deleting todo', error });
    }
});
exports.deleteTodo = deleteTodo;
