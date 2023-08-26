import express from "express"
import { createTask, deleteTask, getTask, getTasks, updateTask } from "../controller/Task.js"
const Router = express.Router()

Router.post("/", createTask)
Router.get("/tasks", getTasks)
Router.get("/task/:id", getTask)
Router.put("/:id", updateTask)
Router.delete("/:id", deleteTask)

export default Router; 