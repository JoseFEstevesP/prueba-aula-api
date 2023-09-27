import rolRegisterController from '#Controllers/rol-register.controller.js';
import rolRegisterDTO from '#Dto/rol-register.dto.js';
import userJWTDTO from '#Dto/user-jwt.dto.js';
import { Router } from 'express';

const rolRoutes = Router();

rolRoutes.post('/register', userJWTDTO, rolRegisterDTO, rolRegisterController);

export default rolRoutes;
