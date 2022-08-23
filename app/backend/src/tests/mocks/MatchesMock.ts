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

const matchesAllMock = [
  {
    id: 1,
    inProgress: false,
    awayTeam: 8,
    awayTeamGoals: 1,
    homeTeam: 16,
    homeTeamGoals: 1
  },
  {
    id: 2,
    inProgress: false,
    awayTeam: 14,
    awayTeamGoals: 1,
    homeTeam: 9,
    homeTeamGoals: 1
  },
  {
    id: 3,
    inProgress: false,
    awayTeam: 11,
    awayTeamGoals: 0,
    homeTeam: 4,
    homeTeamGoals: 3
  },
  {
    id: 4,
    inProgress: false,
    awayTeam: 2,
    awayTeamGoals: 0,
    homeTeam: 3,
    homeTeamGoals: 0
  },
  {
    id: 5,
    inProgress: false,
    awayTeam: 10,
    awayTeamGoals: 1,
    homeTeam: 7,
    homeTeamGoals: 1
  },
  {
    id: 6,
    inProgress: false,
    awayTeam: 13,
    awayTeamGoals: 1,
    homeTeam: 5,
    homeTeamGoals: 1
  },
  {
    id: 7,
    inProgress: false,
    awayTeam: 6,
    awayTeamGoals: 2,
    homeTeam: 12,
    homeTeamGoals: 2
  },
  {
    id: 8,
    inProgress: false,
    awayTeam: 1,
    awayTeamGoals: 1,
    homeTeam: 15,
    homeTeamGoals: 0
  },
  {
    id: 9,
    inProgress: false,
    awayTeam: 12,
    awayTeamGoals: 3,
    homeTeam: 1,
    homeTeamGoals: 0
  },
  {
    id: 10,
    inProgress: false,
    awayTeam: 9,
    awayTeamGoals: 2,
    homeTeam: 2,
    homeTeamGoals: 0
  },
  {
    id: 11,
    inProgress: false,
    awayTeam: 3,
    awayTeamGoals: 0,
    homeTeam: 13,
    homeTeamGoals: 1
  },
  {
    id: 12,
    inProgress: false,
    awayTeam: 4,
    awayTeamGoals: 1,
    homeTeam: 6,
    homeTeamGoals: 0
  },
  {
    id: 13,
    inProgress: false,
    awayTeam: 5,
    awayTeamGoals: 1,
    homeTeam: 8,
    homeTeamGoals: 2
  },
  {
    id: 14,
    inProgress: false,
    awayTeam: 16,
    awayTeamGoals: 1,
    homeTeam: 14,
    homeTeamGoals: 2
  },
  {
    id: 15,
    inProgress: false,
    awayTeam: 15,
    awayTeamGoals: 1,
    homeTeam: 10,
    homeTeamGoals: 0
  },
  {
    id: 16,
    inProgress: false,
    awayTeam: 7,
    awayTeamGoals: 0,
    homeTeam: 11,
    homeTeamGoals: 0
  },
  {
    id: 17,
    inProgress: false,
    awayTeam: 8,
    awayTeamGoals: 3,
    homeTeam: 1,
    homeTeamGoals: 2
  },
  {
    id: 18,
    inProgress: false,
    awayTeam: 5,
    awayTeamGoals: 2,
    homeTeam: 12,
    homeTeamGoals: 4
  },
  {
    id: 19,
    inProgress: false,
    awayTeam: 2,
    awayTeamGoals: 2,
    homeTeam: 11,
    homeTeamGoals: 2
  },
  {
    id: 20,
    inProgress: false,
    awayTeam: 9,
    awayTeamGoals: 1,
    homeTeam: 7,
    homeTeamGoals: 0
  },
  {
    id: 21,
    inProgress: false,
    awayTeam: 13,
    awayTeamGoals: 1,
    homeTeam: 6,
    homeTeamGoals: 3
  },
  {
    id: 22,
    inProgress: false,
    awayTeam: 3,
    awayTeamGoals: 1,
    homeTeam: 4,
    homeTeamGoals: 3
  },
  {
    id: 23,
    inProgress: false,
    awayTeam: 16,
    awayTeamGoals: 3,
    homeTeam: 15,
    homeTeamGoals: 2
  },
  {
    id: 24,
    inProgress: false,
    awayTeam: 14,
    awayTeamGoals: 2,
    homeTeam: 10,
    homeTeamGoals: 2
  },
  {
    id: 25,
    inProgress: false,
    awayTeam: 6,
    awayTeamGoals: 1,
    homeTeam: 2,
    homeTeamGoals: 0
  },
  {
    id: 26,
    inProgress: false,
    awayTeam: 1,
    awayTeamGoals: 0,
    homeTeam: 13,
    homeTeamGoals: 1
  },
  {
    id: 27,
    inProgress: false,
    awayTeam: 15,
    awayTeamGoals: 2,
    homeTeam: 5,
    homeTeamGoals: 1
  },
  {
    id: 28,
    inProgress: false,
    awayTeam: 7,
    awayTeamGoals: 0,
    homeTeam: 16,
    homeTeamGoals: 3
  },
  {
    id: 29,
    inProgress: false,
    awayTeam: 4,
    awayTeamGoals: 4,
    homeTeam: 9,
    homeTeamGoals: 0
  },
  {
    id: 30,
    inProgress: false,
    awayTeam: 12,
    awayTeamGoals: 4,
    homeTeam: 3,
    homeTeamGoals: 0
  },
  {
    id: 31,
    inProgress: false,
    awayTeam: 10,
    awayTeamGoals: 0,
    homeTeam: 8,
    homeTeamGoals: 2
  },
  {
    id: 32,
    inProgress: false,
    awayTeam: 11,
    awayTeamGoals: 1,
    homeTeam: 14,
    homeTeamGoals: 5
  },
  {
    id: 33,
    inProgress: false,
    awayTeam: 16,
    awayTeamGoals: 1,
    homeTeam: 1,
    homeTeamGoals: 1
  },
  {
    id: 34,
    inProgress: false,
    awayTeam: 6,
    awayTeamGoals: 1,
    homeTeam: 9,
    homeTeamGoals: 3
  },
  {
    id: 35,
    inProgress: false,
    awayTeam: 5,
    awayTeamGoals: 3,
    homeTeam: 10,
    homeTeamGoals: 1
  },
  {
    id: 36,
    inProgress: false,
    awayTeam: 7,
    awayTeamGoals: 1,
    homeTeam: 2,
    homeTeamGoals: 0
  },
  {
    id: 37,
    inProgress: false,
    awayTeam: 13,
    awayTeamGoals: 1,
    homeTeam: 15,
    homeTeamGoals: 0
  },
  {
    id: 38,
    inProgress: false,
    awayTeam: 4,
    awayTeamGoals: 1,
    homeTeam: 14,
    homeTeamGoals: 2
  },
  {
    id: 39,
    inProgress: false,
    awayTeam: 11,
    awayTeamGoals: 0,
    homeTeam: 3,
    homeTeamGoals: 2
  },
  {
    id: 40,
    inProgress: false,
    awayTeam: 8,
    awayTeamGoals: 1,
    homeTeam: 12,
    homeTeamGoals: 4
  },
  {
    id: 41,
    inProgress: true,
    awayTeam: 9,
    awayTeamGoals: 0,
    homeTeam: 16,
    homeTeamGoals: 2
  },
  {
    id: 42,
    inProgress: true,
    awayTeam: 1,
    awayTeamGoals: 0,
    homeTeam: 6,
    homeTeamGoals: 1
  },
  {
    id: 43,
    inProgress: true,
    awayTeam: 10,
    awayTeamGoals: 0,
    homeTeam: 11,
    homeTeamGoals: 0
  },
  {
    id: 44,
    inProgress: true,
    awayTeam: 15,
    awayTeamGoals: 2,
    homeTeam: 7,
    homeTeamGoals: 2
  },
  {
    id: 45,
    inProgress: true,
    awayTeam: 3,
    awayTeamGoals: 1,
    homeTeam: 5,
    homeTeamGoals: 1
  },
  {
    id: 46,
    inProgress: true,
    awayTeam: 12,
    awayTeamGoals: 1,
    homeTeam: 4,
    homeTeamGoals: 1
  },
  {
    id: 47,
    inProgress: true,
    awayTeam: 14,
    awayTeamGoals: 2,
    homeTeam: 8,
    homeTeamGoals: 1
  },
  {
    id: 48,
    inProgress: true,
    awayTeam: 2,
    awayTeamGoals: 1,
    homeTeam: 13,
    homeTeamGoals: 1
  },
  {
    id: 49,
    inProgress: false,
    awayTeam: 6,
    awayTeamGoals: 0,
    homeTeam: 10,
    homeTeamGoals: 1
  }
];

export {
  matchesMock,
  newMatchMocks,
  matchesMockResults,
  matchesAllMock,
};
