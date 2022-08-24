import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';

import Team from '../database/models/Team.model';
import Match from '../database/models/Match.model';
import UserService from '../services/User.service';

import { matchesMock, newMatchMocks, matchesMockResults } from './mocks/MatchesMock';
import teamsMock from './mocks/TeamsMock';

chai.use(chaiHttp);

const { expect } = chai;


const teamsAreEqual = 'It is not possible to create a match with two equal teams';
const teamDontExists = 'There is no team with such id!';
const invalidToken = 'Token must be a valid token';

beforeEach(sinon.restore);

describe('Testa rota de partidas "GET /matches"', () => {
  it('O end point retorna corretamente a lista com todas as partidas' , async() => {
      sinon.stub(Match, 'findAll').resolves(matchesMock as Match[]);
      const res = await chai.request(app).get('/matches');
      expect(res).to.have.status(200);
      expect(res.body).to.be.eql(matchesMockResults);
  });
  it('Testa se a rota /matches/?inProgress=false filtra partidas finalizadas', async () => {
      sinon.stub(Match, 'findAll')
        .resolves(matchesMock.filter(({inProgress}) => ! inProgress) as Match[]);
      const res = await chai.request(app).get('/matches/?inProgress=false');
      expect(res).to.have.status(200);
      expect(res.body).to.be.eql(matchesMockResults.filter(({inProgress}) => ! inProgress));
    });
  it('Testa se a rota /matches/?inProgress=true filtra partidas em andamento', async () => {
      sinon.stub(Match, 'findAll')
        .resolves(matchesMock.filter(({inProgress}) => inProgress) as Match[]);
      const res = await chai.request(app).get('/matches/?inProgress=false');
      expect(res).to.have.status(200);
      expect(res.body).to.be.eql(matchesMockResults.filter(({inProgress}) => inProgress));
    });
});

describe('Testa rota de partidas "POST /matches"', () => {
  describe('Os dados da nova partida são inválidos', () => {
    it('Retorna um error se os dois times da partida forem iguais', async() => {
      sinon.stub(Team, 'findOne').resolves(teamsMock[0] as Team);
      sinon.stub(UserService, 'validate').resolves({ status: 0, message: '', role: 'admin' });
      const res = await chai.request(app).post('/matches').send(newMatchMocks[0]);
      expect(res).to.have.status(401);
      expect(res.body).to.have.property('message', teamsAreEqual);
    });
    it('Retorna um error ao tentar inserir uma partida com um time que não existe', async() => {
      sinon.stub(Team, 'findOne').resolves(null);
      sinon.stub(UserService, 'validate').resolves({ status: 0, message: '', role: 'admin' });
      const res = await chai.request(app).post('/matches').send(newMatchMocks[1]);
      expect(res).to.have.status(404);
      expect(res.body).to.have.property('message', teamDontExists);
    });
    it('Retorna um error se tentar inserir uma partida sem um token válido', async() => {
      sinon.stub(Team, 'findOne').resolves(teamsMock[0] as Team);
      const invalidadeTokenTest = { status: 401, message: invalidToken, role: '' };
      sinon.stub(UserService, 'validate').resolves(invalidadeTokenTest);
      const res = await chai.request(app).post('/matches').send(newMatchMocks[2]);
      expect(res).to.have.status(401);
      expect(res.body).to.have.property('message', invalidToken);
    });
  });
  describe('Os dados da nova partida e o token são válidos', () => {
    it('Salva a partida no banco de dados', async() => {
      const createdMatch = {
        id: 1,
        ...newMatchMocks[2],
        inProgress: true,
      };
      sinon.stub(Team, 'findOne').resolves(teamsMock[0] as Team);
      sinon.stub(UserService, 'validate').resolves({ status: 0, message: '', role: 'admin' });
      sinon.stub(Match, 'create').resolves(createdMatch as Match);
      const res = await chai.request(app).post('/matches').send(newMatchMocks[2]);
      expect(res).to.have.status(201);
      expect(res.body).to.be.eql(createdMatch);
    });
  });
});
