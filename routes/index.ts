import UserRouter from "./users";
import TaskRouter from "./task";
import DictionaryRouter from "./dictionary";

export default function buildRouter(router) {
  router.use(UserRouter);
  router.use(TaskRouter);
  router.use(DictionaryRouter);
}