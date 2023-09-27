import userRoutes from '#Routes/user.routes.js';
import express from 'express';
const expressApp = express();
// middleware
expressApp.use(express.json());
// routes
expressApp.use('/user', userRoutes);
export default expressApp;
