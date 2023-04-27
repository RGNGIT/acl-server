import UserRouter from "./users";
import TaskRouter from "./task";

export default function buildRouter(router) {
  router.use(UserRouter);
  router.use(TaskRouter);
}