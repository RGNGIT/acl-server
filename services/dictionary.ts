import MySQL2Commander from "../mysqlCommander";
import { formSets } from "./misc";

class DictionaryService {
  async addNewDuty(block, table) {
    const res = await (new MySQL2Commander).queryExec(`INSERT INTO ${table} (${Object.keys(block).join(", ")}) VALUES (${Object.values(block).join(", ")});`);
    return res;
  }
  async fetchAll(table) {
    const res = await (new MySQL2Commander).queryExec(`SELECT * FROM ${table};`);
    return res;
  }
  async fetchOneByKey(Key, table) {
    const res = await (new MySQL2Commander).queryExec(`SELECT * FROM ${table} WHERE ${table}.Key = ${Key};`);
    return res[0];
  }
  async editOneByKey(Key, block, table) {
    const res = await (new MySQL2Commander).queryExec(`UPDATE ${table} SET ${formSets(block)} WHERE ${table}.Key = ${Key};`);
    return res;
  }
  async deleteOneByKey(Key, table) {
    const res = await (new MySQL2Commander).queryExec(`DELETE FROM ${table} WHERE ${table}.Key = ${Key};`);
    return res;
  }
}

export default new DictionaryService();