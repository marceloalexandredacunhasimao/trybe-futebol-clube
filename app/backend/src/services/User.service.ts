import * as bcrypt from 'bcryptjs';
import User from '../database/models/User.model';
import { validateLogin, makeToken, getTokenData } from '../helper';

class UserService {
  static async login(email: string, password: string):
  Promise<{ status: number, message: string, token: string }> {
    const { status, message } = validateLogin(email, password);
    if (message !== '') {
      return { status, message, token: '' };
    }
    const user = await User.findOne({ where: { email }, raw: true });
    if (!user) {
      return { status: 401, message: 'Incorrect email or password', token: '' };
    }
    if (!await bcrypt.compare(password, user.password)) {
      return { status: 401, message: 'Incorrect email or password', token: '' };
    }
    const token = makeToken(user); // makeToken({ email, username, role, id });
    return { status: 200, message: '', token };
  }

  static async validate(auth: string | undefined):
  Promise<{ status: number, message: string, role: string }> {
    const { status, message, data } = getTokenData(auth);
    if (!data) return { status, message, role: '' };
    const { email } = data.payload.data;
    const user = await User.findOne({ where: { email }, raw: true });
    if (!user) return { status: 401, message: 'Invalid token', role: '' };
    return { status: 200, message: '', role: user.role };
  }
}

export default UserService;
