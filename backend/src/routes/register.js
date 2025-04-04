import {Router} from 'express';
import { postUsers } from '../controllers/register/register';

const router = Router();

router.route('/')
    .post(postUsers)

export default router;