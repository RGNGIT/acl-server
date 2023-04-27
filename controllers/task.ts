import { Request, Response } from "express";
import TaskService from "../services/task";

class TaskController {
  async addTask(req: Request, res: Response): Promise<void> {
    try {
      const { name, description, openDate, plannedDate, priorityKey, nodeKey } =
        req.body;
      await TaskService.addNew({
        Name: `'${name}'`,
        Description: `'${description}'`,
        OpenDate: `STR_TO_DATE('${openDate}', '%d-%m-%Y')`,
        PlannedCloseDate: `STR_TO_DATE('${plannedDate}', '%d-%m-%Y')`,
        Priority_Key: priorityKey,
        Node_Key: nodeKey,
      });
      res.send("OK");
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  }
  async connectUserTask(req: Request, res: Response): Promise<void> {
    try {
      const { taskKey, roleKey } = req.body;
      await TaskService.connectTaskUser({
        Task_Key: taskKey,
        Role_Key: roleKey,
      });
      res.send("OK");
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  }
  async getUsersTasks(req: Request, res: Response): Promise<void> {
    try {
      const {id} = req.params;
      const result = await TaskService.fetchUsersTasksByKey(id);
      res.send(result);
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  }
}

export default new TaskController();
