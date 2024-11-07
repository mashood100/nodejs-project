import { Request, Response } from 'express';
import Todo, { ITodo } from '../models/Todo';
import Redis from 'ioredis';

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT || '6379'),
  maxRetriesPerRequest: 3
});

export const getAllTodos = async (req: Request, res: Response) => {
  try {
    const todos: ITodo[] = await Todo.find({ user: req.userId });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching todos', error });
  }
};

export const getTodoById = async (req: Request, res: Response) => {
  const cacheKey = `todo:${req.userId}:${req.params.id}`;
  
  try {
    const todo = await Todo.findOne({ _id: req.params.id, user: req.userId });
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    
    // Cache the result
    await redis.setex(cacheKey, 3600, JSON.stringify(todo));
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching todo', error });
  }
};

export const createTodo = async (req: Request, res: Response) => {
  try {
    const newTodo: ITodo = await Todo.create({
      ...req.body,
      user: req.userId
    });
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).json({ message: 'Error creating todo', error });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );
    if (!updatedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json(updatedTodo);
  } catch (error) {
    res.status(400).json({ message: 'Error updating todo', error });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const deletedTodo = await Todo.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!deletedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: 'Error deleting todo', error });
  }
};