import { Request, Response } from "express";

class DictionaryController {
  async add(req: Request, res: Response): Promise<void> {
    try {
      
    } catch(err) {
      console.log(err);
      res.json(err);
    }
  }
  async edit(req: Request, res: Response): Promise<void> {
    try {

    } catch(err) {
      console.log(err);
      res.json(err);
    }
  }
  async delete(req: Request, res: Response): Promise<void> {
    try {

    } catch(err) {
      console.log(err);
      res.json(err);
    }
  }
  async get(req: Request, res: Response): Promise<void> {
    try {

    } catch(err) {
      console.log(err);
      res.json(err);
    }
  }
}

export default new DictionaryController();