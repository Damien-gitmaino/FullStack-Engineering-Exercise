import {Router} from 'express';
import { getConfig, updateConfig } from '../controllers/admin/admin';

const router = Router();

router.route('/')
    .get(getConfig)
    .put(updateConfig)

export default router;