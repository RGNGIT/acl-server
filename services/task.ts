import MySQL2Commander from "../mysqlCommander";
import { formSets } from "./misc";

class TaskService {
  async addNew(block: { Name, Description, OpenDate, PlannedCloseDate, Priority_Key, Node_Key, Task_Type_Key }) {
    return await (new MySQL2Commander).queryExec(`INSERT INTO task (${Object.keys(block).join(", ")}) VALUES (${Object.values(block).join(", ")});`);
  }
  async connectTaskUser(block: { Role_Key, Task_Key }) {
    return await (new MySQL2Commander).queryExec(`INSERT INTO claim (${Object.keys(block).join(", ")}, DateAttach) VALUES (${Object.values(block).join(", ")}, NOW());`);
  }
  async connectNodeUser(block: { Role_Key, Node_Key }) {
    return await (new MySQL2Commander).queryExec(`INSERT INTO role_node (${Object.keys(block).join(", ")}) VALUES (${Object.values(block).join(", ")});`);
  }
  async fetchUserNodes(Key) {
    return await (new MySQL2Commander).queryExec(`SELECT d.Key, d.Name, d.ShName FROM phys as a, role as b, role_node as c, node as d WHERE c.Role_Key = b.Key AND b.Key = c.Role_Key AND c.Node_Key = d.Key AND a.Key = ${Key};`);
  }
  async fetchUsersTasksByKey(Key, Node_Key) {
    return await (new MySQL2Commander).queryExec(`
    SELECT a.Key as TaskKey, a.Name, a.Description, a.OpenDate, a.PlannedCloseDate, a.FactCloseDate, a.Task_Type_Key as TaskType, 
    b.Key as ClaimKey, b.DateAttach, b.DateDetach, 
    d.Key as PriorityKey, d.Name as PriorityName, d.ShName as PriorityShName, 
    e.Key as NodeKey, e.Name as NodeName, e.ShName as NodeShName  
    FROM task as a, claim as b, role as c, priority as d, node as e, role_node as f
    WHERE a.Key = b.Task_Key AND 
    b.Role_Key = c.Key AND 
    d.Key = a.Priority_Key AND 
    e.Key = a.Node_Key AND 
    f.Role_Key = c.Key AND 
    f.Node_Key = ${Node_Key} AND 
    c.Phys_Key = ${Key};`);
  }
  async fetchNodeTasks(Key) {
    return await (new MySQL2Commander).queryExec(`
    SELECT a.Key as TaskKey, a.Name, a.Description, a.OpenDate, a.PlannedCloseDate, a.FactCloseDate, a.Task_Type_Key as TaskType, 
    b.Key as PriorityKey, b.Name as PriorityName, b.ShName as PriorityShName, 
    c.Key as NodeKey, c.Name as NodeName, c.ShName as NodeShName 
    FROM task as a, priority as b, node as c
    WHERE a.Node_Key = ${Key} AND b.Key = a.Priority_Key AND c.Key = ${Key};`);
  }
  async fetchTaskUser(Key) {
    return await (new MySQL2Commander).queryExec(`SELECT b.Key as RoleKey, c.Key as PhysKey, c.Surname, c.Name, c.Patron, d.Name as DutyName FROM claim as a, role as b, phys as c, duty as d WHERE a.Role_Key = b.Key AND b.Phys_Key = c.Key AND b.Duty_Key = d.Key AND a.Task_Key = ${Key};`);
  }
  async fetchTaskType(Key) {
    return await (new MySQL2Commander).queryExec(`SELECT * FROM task_type WHERE task_type.Key = ${Key};`);
  }
  async editTaskByKey(Key, block) {
    return await (new MySQL2Commander).queryExec(`UPDATE task SET ${formSets(block)} WHERE task.Key = ${Key};`);
  }
  async fetchNodesUsersByKey(Key) {
    return await (new MySQL2Commander).queryExec(`
    SELECT a.Key as PhysKey, a.Name, a.Surname, a.Patron, a.Login, 
    b.Key as RoleKey, d.Key as DutyKey, d.Name as DutyName, e.Name as ExpName 
    FROM phys as a, role as b, role_node as c, duty as d, exp as e
    WHERE a.Key = b.Phys_Key AND 
    b.Duty_Key = d.Key AND 
    b.Key = c.Role_Key AND 
    e.Key = b.Duty_Key AND
    c.Node_Key = ${Key};`
    );
  }
  async addTimeTrackToTask(TaskKey, RoleKey, Time) {
    return await (new MySQL2Commander).queryExec(`INSERT INTO timetrack (Time, Task_Key, Role_Key) VALUES ('${Time}', ${TaskKey}, ${RoleKey});`);
  }
  async fetchTimetrackByRoleKey(Key) {
    return await (new MySQL2Commander).queryExec(`SELECT * FROM timetrack WHERE timetrack.Role_Key = ${Key};`);
  }
}

export default new TaskService;