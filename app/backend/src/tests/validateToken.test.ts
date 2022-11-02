import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';

import User from '../database/models/User.model';

import { UsersMock } from './mocks/UsersMock';
import { makeToken } from '../helper';

chai.use(chaiHttp);

const { expect } = chai;

const readmeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc';
const validToken = makeToken(UsersMock[0]);

describe('Testa rota de validação do token "GET /login/validate"', () => {
  describe('O token é inválido', () => {
    beforeEach(() => {
      sinon.restore();
      sinon.stub(User, 'findOne').resolves(null);
    });
    it('Retorna um error se o token não for informado', async() => {
      const res = await chai.request(app).get('/login/validate');
      expect(res).to.have.status(401);
      expect(res.body).to.have.property('message', 'Token must be a valid token');
    });
    it('Retorna um error se não existe um usuário para o token especificado', async() => {
      const res = await chai.request(app)
        .get('/login/validate').auth(readmeToken, { type: 'bearer' });
      expect(res).to.have.status(401);
      expect(res.body).to.have.property('message', 'Token must be a valid token');
    });
  });
  describe('O token é válido', () => {
    it('Retorna a role do usuário se o token for válido', async() => {
      sinon.restore();
      sinon.stub(User, 'findOne').resolves(UsersMock[0] as User);
      const res = await chai.request(app)
        .get('/login/validate').auth(validToken, { type: 'bearer' });
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('role');
    });
  });
});
