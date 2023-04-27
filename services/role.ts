import MySQL2Commander from "../mysqlCommander";
import { formSets } from "./misc";

class RoleService {
  async addNew(block) {
    const res = await (new MySQL2Commander).queryExec(`INSERT INTO role (${Object.keys(block).join(", ")}, DateRecrut) VALUES (${Object.values(block).join(", ")}, NOW());`);
    return res;
  }
  async patch(Key, block) {
    const res = await (new MySQL2Commander).queryExec(`UPDATE role SET ${formSets(block)} WHERE role.Key = ${Key};`);
    return res;
  }
}

export default new RoleService();