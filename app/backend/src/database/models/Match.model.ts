import { BOOLEAN, INTEGER, Model } from 'sequelize';
import Team from './Team.model';
import db from '.';

class Match extends Model {
  id!: number;
  inProgress!: boolean;
  awayTeam!: number;
  awayTeamGoals!: number;
  homeTeam!: number;
  homeTeamGoals!: number;
}

Match.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  inProgress: {
    field: 'in_progress',
    allowNull: false,
    type: BOOLEAN,
  },
  awayTeam: {
    type: INTEGER,
    allowNull: false,
    field: 'away_team',
  },
  awayTeamGoals: {
    field: 'away_team_goals',
    allowNull: false,
    type: INTEGER,
  },
  homeTeam: {
    type: INTEGER,
    allowNull: false,
    field: 'home_team',
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
    field: 'home_team_goals',
  },
}, {
  timestamps: false,
  sequelize: db,
  modelName: 'matches',
});

Team.belongsTo(Match, { foreignKey: 'id', as: 'teamHome' });
Team.belongsTo(Match, { foreignKey: 'id', as: 'teamAway' });

Match.hasMany(Team, { foreignKey: 'id', as: 'teamHome' });
Match.hasMany(Team, { foreignKey: 'id', as: 'teamAway' });

export default Match;
