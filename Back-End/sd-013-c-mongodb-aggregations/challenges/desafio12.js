db.trips.aggregate([
  {
    $project: {
      diaDaSemana: { $dayOfWeek: "$startTime" },
      startStationName: 1,
    },
  },
  {
    $match: {
      diaDaSemana: 5,
    },
  },
  {
    $group: {
      _id: "$startStationName",
      count: { $sum: 1 },
    },
  },
  {
    $sort: {
      count: -1,
    },
  },
  {
    $limit: 1,
  },
  {
    $project: {
      nomeEstacao: "$_id",
      total: "$count",
      _id: 0,
    },
  },
]);
