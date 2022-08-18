import db from '.';
import { INTEGER, STRING, Model } from 'sequelize';

class User extends Model {
  id!: number;
  role!: string;
  username!: string;
  password!: string;
  email!: string;
}

User.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  role: {
    type: STRING,
    allowNull: false,
  },
  username: {
    type: STRING,
    allowNull: false,
  },
  password: {
    allowNull: false,
    type: STRING,
  },
  email: {
    allowNull: false,
    type: STRING,
  },
}, {
  sequelize: db,
  modelName: 'users',
  timestamps: false,
});

export default User;
