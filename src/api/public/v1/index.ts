import { Router } from "express";

import SampleRoutes from "./samplePublicModule/sample.router";

const router = Router();

router.use("/sample", SampleRoutes);

export default router;
