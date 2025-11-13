import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import Todo from "../models/Todo";

export const getTodos = asyncHandler(async (req: Request, res: Response) => {
    console.log(req.user);
    const todos = await Todo.find({ author: req.user.id });
    res.status(200).json({ message: 'Get all todos', todos });
}); // get all todos | GET

export const createTodo = asyncHandler(async (req: Request, res: Response) => {
    const { title, description } = req.body;
    if (!title || !description) {
        res.status(400);
        throw new Error('Title and description are required');
    }

    const todo = await Todo.create({
        title,
        description,
        author: req.user.id
    });
    await todo.save();
    res.status(200).json({ message: 'Todo created Successfully' });
}); // create todo | POST

export const updateTodo = asyncHandler(async (req: Request, res: Response) => {
    const { title, description } = req.body;
    const id = req.params.id;

    const updateData: any = {}
    if(title) updateData.title = title;
    if(description) updateData.description = description;

    await Todo.findByIdAndUpdate(id, updateData, { new: true });

    res.status(200).json({ message: 'Todo updated Successfully' });
}); // update todo | PUT

export const deleteTodo = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;
    await Todo.findByIdAndDelete(id);
    res.status(200).json({ message: 'Todo deleted Successfully' });
}); // delete todo | DELETE

export const toggleTodo = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;
    const todo = await Todo.findById(id);
    todo.completed = !todo.completed;
    await todo.save();
    res.status(200).json({ message: 'Todo toggled Successfully' });
}); // toggle completion | PATCH