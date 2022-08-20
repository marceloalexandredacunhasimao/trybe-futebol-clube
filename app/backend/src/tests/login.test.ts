import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
//import Example from '../database/models/ExampleModel';
import User from '../database/models/User.model';
import { Response } from 'superagent';
import { UsersMock, logins } from './mocks/UsersMock';

chai.use(chaiHttp);

const { expect } = chai;


//sinon.stub(User, 'findOne').resolves(null);

let login = {
  email: '',
  password: '',
};
beforeEach(() => {
  login = { ...logins[0] }
});

describe('Testa rota de login "POST /login"', () => {
  describe('O login é inválido', () => {
    beforeEach(() => {
      sinon.restore();
      sinon.stub(User, 'findOne').resolves(null);
    });
    it('Retorna um error se o e-mail não for informado', async() => {
      login.email = '';
      const res = await chai.request(app).post('/login').send(login);
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('message', 'All fields must be filled');
    });
    it('Retorna um error se a senha não for informada', async() => {
      login.password = '';
      const res = await chai.request(app).post('/login').send(login);
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('message', 'All fields must be filled');
    });
    it('Retorna um error se o e-mail for inválido', async() => {
      login.email= 'invalid@email.com';
      const res = await chai.request(app).post('/login').send(login);
      expect(res).to.have.status(401);
      expect(res.body).to.have.property('message', 'Incorrect email or password');
    });
  });
  describe('O login é válido', () => {
    it(`Retorna um token quando o login é feito com sucesso`, async() => {
      sinon.restore();
      sinon.stub(User, 'findOne').resolves(UsersMock[0] as User);
      const res = await chai.request(app).post('/login').send(login);
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('token');
    });
  });
});
