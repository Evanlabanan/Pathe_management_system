import { Router } from 'express';
import * as reportsController from '../controllers/reports.controller.js';

const router = Router();
router.get('/receipt/:receiptNo', reportsController.getReceipt);
router.get('/sales', reportsController.getSales);
router.get('/performance', reportsController.getPerformance);
router.get('/theaters', reportsController.getTheaters);
router.get('/movies', reportsController.getMovies);

export default router;