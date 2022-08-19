import { Model, BOOLEAN, INTEGER } from 'sequelize';
import db from '.';
import Team from './Team.model';

class Match extends Model {
  id!: number;
  homeTeam!: number;
  homeTeamGoals!: number;
  awayTeam!: number;
  awayTeamGoals!: number;
  inProgress!: boolean;
}

Match.init({
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: INTEGER,
  },
  inProgress: {
    field: 'in_progress',
    allowNull: false,
    type: BOOLEAN,
  },
  homeTeam: {
    field: 'home_team',
    type: INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    field: 'home_team_goals',
    type: INTEGER,
    allowNull: false,
  },
  awayTeam: {
    field: 'away_team',
    type: INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    field: 'away_team_goals',
    allowNull: false,
    type: INTEGER,
  },
}, {
  modelName: 'matches',
  sequelize: db,
  timestamps: false,
});

Match.hasMany(Team, { foreignKey: 'home_team', as: 'teamHome' });
Match.hasMany(Team, { foreignKey: 'away_team', as: 'teamAway' });

Team.belongsTo(Match, { foreignKey: 'home_team', as: 'teamHome' });
Team.belongsTo(Match, { foreignKey: 'away_team', as: 'teamAway' });

export default Match;
