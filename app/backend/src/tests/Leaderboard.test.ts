import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';

//import { Response } from 'superagent';

import Team from '../database/models/Team.model';
import Match from '../database/models/Match.model';

import { matchesAllMock } from './mocks/MatchesMock';
import teamsMock from './mocks/TeamsMock';
import {
  leaderboardHomeMocks,
  leaderboardAwayMocks,
  leaderboardAllMocks,
} from './mocks/LeaderboardMocks';

chai.use(chaiHttp);

const { expect } = chai;


const matchesAllMockNotInProgress = matchesAllMock.filter(({inProgress}) => !inProgress);
sinon.stub(Match, 'findAll').resolves(matchesAllMockNotInProgress as Match[]);
sinon.stub(Team, 'findAll').resolves(teamsMock as Team[]);

describe('Testa rota "GET /leaderboard/home"', () => {
  it('O end point retorna a classificação dos times que jogaram em casa' , async() => {
      const res = await chai.request(app).get('/leaderboard/home');
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
      expect(res.body[0]).to.be.eql(leaderboardHomeMocks[0]);
  });
  it('O end point retorna a classificação dos times que jogaram fora de casa' , async() => {
      const res = await chai.request(app).get('/leaderboard/away');
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
      expect(res.body[0]).to.be.eql(leaderboardAwayMocks[0]);
  });
  it('O end point retorna a classificação geral dos times' , async() => {
      const res = await chai.request(app).get('/leaderboard');
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
      expect(res.body[0]).to.be.eql(leaderboardAllMocks[0]);
  });
});
