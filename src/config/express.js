import courseRoutes from '#Routes/course.routes.js';
import rolRoutes from '#Routes/rol.routes.js';
import userRoutes from '#Routes/user.routes.js';
import express from 'express';
const expressApp = express();
// middleware
expressApp.use(express.json());
// routes
expressApp.use('/user', userRoutes);
expressApp.use('/course', courseRoutes);
expressApp.use('/rol', rolRoutes);
export default expressApp;
