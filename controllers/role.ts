import { Request, Response } from "express";
import RoleService from "../services/role";

class RoleController {
  async regNewRole(req: Request, res: Response): Promise<void> {
    try {
      const { dutyKey, physKey, expKey } = req.body;
      await RoleService.addNew({ Duty_Key: `'${dutyKey}'`, Phys_Key: `'${physKey}'`, Exp_Key: `'${expKey}'` });
      res.send("OK");
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  }
}

export default new RoleController();