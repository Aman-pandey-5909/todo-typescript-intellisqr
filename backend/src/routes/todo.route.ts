import express from "express";
const router = express.Router();
import { verifySession } from "../middleware/verifysession";

import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  toggleTodo,
} from "../controllers/todo.controller";

router.get("/todo", verifySession, getTodos);
router.post("/todo", verifySession, createTodo);
router.put("/todo/:id", verifySession, updateTodo);
router.delete("/todo/:id", verifySession, deleteTodo);
router.patch("/todo/:id", verifySession, toggleTodo);

export default router;
