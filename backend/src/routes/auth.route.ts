import express from 'express';
const router = express.Router();
import {auth} from '../controllers/auth.controller';

router.post('/auth', auth);

export default router;