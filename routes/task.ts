import { Router } from "express";
import TaskController from "../controllers/task";
import SERVER from "../const/request";

const router = Router();

router.post(SERVER.ADD_TASK, TaskController.addTask);
router.post(SERVER.CONNECT_ROLE_TASK, TaskController.connectUserTask);
router.get(SERVER.GET_USER_TASKS, TaskController.getUsersTasks);
router.get(SERVER.GET_NODE_TASKS, TaskController.getTasks);
router.post(SERVER.CONNECT_USER_NODE, TaskController.connectUserNode);
router.get(SERVER.GET_USER_NODES, TaskController.getUserNodes);
router.patch(SERVER.EDIT_TASK, TaskController.editTask);
router.get(SERVER.GET_NODE_USERS, TaskController.getUsersOfNode);

export default router;