import courseReadController from '#Controllers/course-read.controller.js';
import { Router } from 'express';

const courseRoutes = Router();
courseRoutes.get('/list', courseReadController);
export default courseRoutes;
