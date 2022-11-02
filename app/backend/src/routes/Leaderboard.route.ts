import { Router } from 'express';
import { LeaderboardController } from '../controllers';

const router = Router();

router.route('/home').get(LeaderboardController.findAllHome);
router.route('/away').get(LeaderboardController.findAllAway);
router.route('/').get(LeaderboardController.findAll);

export default router;
