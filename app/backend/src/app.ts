import * as express from 'express';
import {
  UserController,
  TeamController,
  MatchController,
  LeaderboardController,
} from './controllers';
import authMiddleware from './middlewares/auth';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
    this.app.post('/login', UserController.login);
    this.app.get('/login/validate', UserController.validate);

    this.app.get('/teams', TeamController.findAll);
    this.app.get('/teams/:id', TeamController.findById);

    this.app.get('/matches', MatchController.findByProgressStatus);
    this.app.post('/matches', authMiddleware, MatchController.create);
    this.app.patch('/matches/:id/finish', MatchController.finish);
    this.app.patch('/matches/:id', MatchController.update);

    this.app.get('/leaderboard/home', LeaderboardController.findAllHome);
    this.app.get('/leaderboard/away', LeaderboardController.findAllAway);
    this.app.get('/leaderboard', LeaderboardController.findAll);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
