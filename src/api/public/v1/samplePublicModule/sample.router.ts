import { Router } from "express";
import SampleController from "./sample.controller";

const router = Router();

router.get("/resourse", SampleController.sampleMethod);

export default router;