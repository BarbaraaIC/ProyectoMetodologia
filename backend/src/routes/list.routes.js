import { Router } from "express";
import { getList, createList, updateList, deleteList } from "../controllers/list.controller.js";

const router = Router();

router.get("/list", getList);
router.post("/list", createList);
router.put("/list/:id_listado", updateList);


export default router;