import { Router } from "express";
import DictionaryController from "../controllers/dictionary";
import SERVER from "../const/request";

const router = Router();

router.get(SERVER.GET_DICTIONARY, DictionaryController.get);
router.post(SERVER.ADD_DICTIONARY, DictionaryController.add);
router.patch(SERVER.EDIT_DICTIONARY, DictionaryController.edit);
router.delete(SERVER.DELETE_DICTIONARY, DictionaryController.delete);

export default router;