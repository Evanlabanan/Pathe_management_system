import { Router } from 'express';
import * as branchController from '../controllers/branches.controller.js';

const router = Router();

// Quand on fait un GET sur cette route, ça lance le contrôleur
router.get('/', branchController.getBranches);

export default router;