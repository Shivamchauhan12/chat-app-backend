import { Router } from "express";
const router = Router();
import AuthController from "../Controllers/AuthController.js";
import ChatGroupController from "../Controllers/ChatGroupController.js";
import authMiddleware from "../Middlewares/AuthMiddleware.js";
import ChatGroupUserController from "../Controllers/ChatGroupsUserController.js";
import ChatsController from "../Controllers/ChatController.js";

// Auth Routes
router.post("/auth/login", AuthController.login);

// Chat Group Routes
router.get("/chat-group", authMiddleware, ChatGroupController.index);
router.get("/chat-group/:id", ChatGroupController.show);
router.post("/chat-group", authMiddleware, ChatGroupController.store);
router.put("/chat-group/:id", authMiddleware, ChatGroupController.update);
router.delete("/chat-group/:id", authMiddleware, ChatGroupController.delete);

// * Chat group user
router.get("/chat-group-user", ChatGroupUserController.index);
router.post("/chat-group-user", ChatGroupUserController.store);

// * Chats
router.get("/chats/:groupId", ChatsController.index);

//*visitor log
router.get("/visitor-log", AuthController.visitorLog);

export default router;