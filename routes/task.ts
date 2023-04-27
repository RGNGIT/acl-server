import { Router } from "express";
import TaskController from "../controllers/task";
import SERVER from "../const/req";

const router = Router();

router.post(SERVER.ADD_TASK, TaskController.addTask);
router.post(SERVER.CONNECT_ROLE_TASK, TaskController.connectUserTask);
router.get(SERVER.GET_USER_TASKS, TaskController.getUsersTasks);

export default router;