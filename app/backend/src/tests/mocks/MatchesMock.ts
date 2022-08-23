const matchesMock = [
  {
    id: 1,
    inProgress: false,
    awayTeam: 8,
    awayTeamGoals: 1,
    homeTeam: 16,
    homeTeamGoals: 1,
  },
  {
    id: 2,
    inProgress: true,
    awayTeam: 14,
    awayTeamGoals: 1,
    homeTeam: 9,
    homeTeamGoals: 1,
  },
];

const newMatchMocks = [
  {
    homeTeam: 1, // O id dos times é igual
    awayTeam: 1, // O id dos times é igual
    homeTeamGoals: 0,
    awayTeamGoals: 0,
  },
  {
    homeTeam: 1000, // O id não existe na tabela de times
    awayTeam: 2000, // O id não existe na tabela de times
    homeTeamGoals: 0,
    awayTeamGoals: 0,
  },
  {
    homeTeam: 16, // O valor deve ser o id do time
    awayTeam: 8, // O valor deve ser o id do time
    homeTeamGoals: 2,
    awayTeamGoals: 2,
  },
];

const matchesMockResults = [
  {
    id: 1,
    inProgress: false,
    awayTeam: 8,
    awayTeamGoals: 1,
    homeTeam: 16,
    homeTeamGoals: 1,
    teamHome: {
        teamName: "São Paulo"
    },
    teamAway: {
        teamName: "Grêmio"
    }
  },
  {
    id: 2,
    inProgress: true,
    awayTeam: 14,
    awayTeamGoals: 1,
    homeTeam: 9,
    homeTeamGoals: 1,
    teamHome: {
        teamName: "Internacional"
    },
    teamAway: {
        teamName: "Santos"
    }
  },
];

export {
  matchesMock,
  newMatchMocks,
  matchesMockResults,
};
