import AuthController from "../Controllers/AuthController";
import ChatGroupController from "../Controllers/ChatGroupController";

import {Router} from "express"
const router = Router();

router.post("/login",AuthController.login);
router.post("/chatgroup",ChatGroupController.store);
router.put("/chatgroup/:id",ChatGroupController.update);
router.delete("/chatgroup/:id",ChatGroupController.delete);

export default router;