import { Router } from 'express';
import { MatchController } from '../controllers';
import authMiddleware from '../middlewares/auth';

const router = Router();

router.route('/').get(MatchController.findByProgressStatus);
router.route('/').post(authMiddleware, MatchController.create);
router.route('/:id/finish').patch(MatchController.finish);
router.route('/:id').patch(MatchController.update);

export default router;
