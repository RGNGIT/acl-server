import MySQL2Commander from "../mysqlCommander";
import { formSets } from "./misc";

class TaskService {
  async addNew(block: {Name, Description, OpenDate, PlannedCloseDate, Priority_Key, Node_Key}) {
    return await (new MySQL2Commander).queryExec(`INSERT INTO task (${Object.keys(block).join(", ")}) VALUES (${Object.values(block).join(", ")});`);
  }
  async connectTaskUser(block: {Role_Key, Task_Key}) {
    return await (new MySQL2Commander).queryExec(`INSERT INTO claim (${Object.keys(block).join(", ")}, DateAttach) VALUES (${Object.values(block).join(", ")}, NOW());`);
  }
  async fetchUsersTasksByKey(Key) {
    return await (new MySQL2Commander).queryExec(`
    SELECT a.Key as TaskKey, a.Name, a.Description, a.OpenDate, a.PlannedCloseDate, a.FactCloseDate, 
    b.Key as ClaimKey, b.DateAttach, b.DateDetach, 
    d.Key as PriorityKey, d.Name as PriorityName, d.ShName as PriorityShName, 
    e.Key as NodeKey, e.Name as NodeName, e.ShName as NodeShName  
    FROM task as a, claim as b, role as c, priority as d, node as e  
    WHERE a.Key = b.Task_Key AND 
    b.Role_Key = c.Key AND 
    d.Key = a.Priority_Key AND 
    e.Key = a.Node_Key AND 
    c.Phys_Key = ${Key};`);
  }
}

export default new TaskService;