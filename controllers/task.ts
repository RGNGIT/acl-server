import {Request, Response} from "express";
import TaskService from "../services/task";

class TaskController {
    async addTask(req : Request, res : Response): Promise < void > {
        try {
            const {
                name,
                description,
                openDate,
                plannedDate,
                priorityKey,
                nodeKey,
                typeKey
            } = req.body;
            await TaskService.addNew({
                Name: `'${name}'`,
                Description: `'${description}'`,
                OpenDate: `STR_TO_DATE('${openDate}', '%Y-%m-%d')`,
                PlannedCloseDate: `STR_TO_DATE('${plannedDate}', '%Y-%m-%d')`,
                Priority_Key: priorityKey,
                Node_Key: nodeKey,
                Task_Type_Key: typeKey
            });
            res.send("OK");
        } catch (err) {
            console.log(err);
            res.json(err);
        }
    }
    async editTask(req : Request, res : Response): Promise < void > {
        try {
            const {id} = req.params;
            const {
                name,
                description,
                openDate,
                plannedDate,
                factDate,
                priorityKey,
                nodeKey,
                typeKey
            } = req.body;
            await TaskService.editTaskByKey(id, {
                Name: `${name}`,
                Description: `${description}`,
                OpenDate: openDate ? `STR_TO_DATE('${openDate}', '%Y-%m-%d')` : null,
                PlannedCloseDate: plannedDate ? `STR_TO_DATE('${plannedDate}', '%Y-%m-%d')` : null,
                FactCloseDate: factDate ? `STR_TO_DATE('${factDate}', '%Y-%m-%d')` : null,
                Priority_Key: priorityKey,
                Node_Key: nodeKey,
                Task_Type_Key: typeKey
            });
            res.send("OK");
        } catch (err) {
            console.log(err);
            res.json(err);
        }
    }
    async connectUserTask(req : Request, res : Response): Promise < void > {
        try {
            const {taskKey, roleKey} = req.body;
            await TaskService.connectTaskUser({Task_Key: taskKey, Role_Key: roleKey});
            res.send("OK");
        } catch (err) {
            console.log(err);
            res.json(err);
        }
    }
    async connectUserNode(req : Request, res : Response): Promise < void > {
        try {
            const {roleKey, nodeKey} = req.body;
            await TaskService.connectNodeUser({Node_Key: nodeKey, Role_Key: roleKey})
            res.send("OK");
        } catch (err) {
            console.log(err);
            res.json(err);
        }
    }
    async getUserNodes(req : Request, res : Response): Promise < void > {
        try {
            const {id} = req.params;
            const result = await TaskService.fetchUserNodes(id);
            res.send(result);
        } catch (err) {
            console.log(err);
            res.json(err);
        }
    }
    async getUsersTasks(req : Request, res : Response): Promise < void > {
        try {
            const {id} = req.params;
            const {nodeKey} = req.query;
            const result = await TaskService.fetchUsersTasksByKey(id, nodeKey);
            for (const task of result) {
                task.worker = (await TaskService.fetchTaskUser(task.TaskKey))[0];
                task.type = (await TaskService.fetchTaskType(task.TaskType))[0];
                delete task.TaskType;
            }
            res.send(result);
        } catch (err) {
            console.log(err);
            res.json(err);
        }
    }
    async getTasks(req : Request, res : Response): Promise < void > {
        try {
            const {id} = req.params;
            const result = await TaskService.fetchNodeTasks(id);
            for (const task of result) {
                task.worker = (await TaskService.fetchTaskUser(task.TaskKey))[0];
                task.type = (await TaskService.fetchTaskType(task.TaskType))[0];
                delete task.TaskType;
            }
            res.send(result);
        } catch (err) {
            console.log(err);
            res.json(err);
        }
    }
    async getUsersOfNode(req : Request, res : Response): Promise < void > {
        try {
            const {id} = req.params;
            const result = await TaskService.fetchNodesUsersByKey(id);
            res.send(result);
        } catch (err) {
            console.log(err);
            res.json(err);
        }
    }
    async addTimeTrack(req : Request, res : Response): Promise < void > {
      try {
          const {taskKey, roleKey, time} = req.body;
          await TaskService.addTimeTrackToTask(taskKey, roleKey, time);
          res.send("OK");
      } catch (err) {
          console.log(err);
          res.json(err);
      }
  }
  async getTimeTrack(req : Request, res : Response): Promise < void > {
    try {
        const {id} = req.params;
        const result = await TaskService.fetchTimetrackByRoleKey(id);
        res.send(result);
    } catch (err) {
        console.log(err);
        res.json(err);
    }
}
}

export default new TaskController();
