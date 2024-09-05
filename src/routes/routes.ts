import express from "express";
import { getDemoRequest } from "../controllers/demo.controller";

const router = express.Router();

//Demo Request
router.get('/demo', getDemoRequest)

export default router;