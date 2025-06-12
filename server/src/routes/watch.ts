import express from 'express';
import {
  getWatches,
  getWatchById,
  createWatch,
  updateWatch,
  deleteWatch,
  addReview,
} from '../controllers/watchController';
import { auth } from '../middleware/auth';

const router = express.Router();

// Public routes
router.get('/', getWatches);
router.get('/:id', getWatchById);

// Protected routes
router.post('/', auth, createWatch);
router.put('/:id', auth, updateWatch);
router.delete('/:id', auth, deleteWatch);
router.post('/:id/reviews', auth, addReview);

export default router; 