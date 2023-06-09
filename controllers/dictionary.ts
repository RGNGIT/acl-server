import { Request, Response } from "express";
import DictionaryService from "../services/dictionary";

class DictionaryController {
  async add(req: Request, res: Response): Promise<void> {
    try {
      const { table } = req.params;
      const { name, shName } = req.body;
      const result = await DictionaryService.addNew(
        { Name: `'${name}'`, ShName: `'${shName}'` },
        table
      );
      res.json({ Key: result.insertId });
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  }
  async edit(req: Request, res: Response): Promise<void> {
    try {
      const { table, id } = req.params;
      const { name, shName } = req.body;
      await DictionaryService.editOneByKey(
        id,
        { Name: name, ShName: shName },
        table
      );
      res.send("OK");
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  }
  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { table, id } = req.params;
      await DictionaryService.deleteOneByKey(id, table);
      res.send("OK");
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  }
  async get(req: Request, res: Response): Promise<void> {
    try {
      const { table } = req.params;
      const { id } = req.query;
      let result;
      if (!id) {
        result = await DictionaryService.fetchAll(table);
      } else {
        result = await DictionaryService.fetchOneByKey(id, table);
      }
      res.json(result);
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  }
}

export default new DictionaryController();
