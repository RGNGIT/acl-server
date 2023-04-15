import MySQL2Commander from "../mysqlCommander";
import { formSets } from "./misc";

class RoleService {
  async addNew(block) {
    const res = await (new MySQL2Commander).queryExec(`INSERT INTO role (${Object.keys(block).join(", ")}) VALUES (${Object.values(block).join(", ")});`);
    return res;
  }
}

export default new RoleService();