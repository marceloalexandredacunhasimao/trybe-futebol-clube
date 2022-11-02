import * as bcrypt from 'bcryptjs';

let UsersMock = [
  {
    id: 1,
    username: 'User',
    email: 'x@y.com',
    password: 'password',
    role: 'user',
  },
];

const logins = UsersMock.map((user) => ({
  email: user.email,
  password: user.password,
}));

const salt = bcrypt.genSaltSync(10);
UsersMock = UsersMock.map((user) => ({
  ...user, password: bcrypt.hashSync(user.password, salt)
}));

export {
  UsersMock,
  logins,
};
