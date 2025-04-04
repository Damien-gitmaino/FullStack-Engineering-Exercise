import {Router} from 'express';
import { getAllUsers } from '../controllers/users/users';

const router = Router();

router.route('/')
    .get(getAllUsers)

export default router;