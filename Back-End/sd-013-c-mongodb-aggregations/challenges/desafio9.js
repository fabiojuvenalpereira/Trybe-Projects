db.trips.aggregate([
  {
    $match: {
      birthYear: { $exists: true },
      $and: [
        {
          birthYear: {
            $ne: "",
          },
        },
        {
          birthYear: {
            $ne: null,
          },
        },
      ],
    },
  },
  {
    $group: {
      _id: "",
      maiorAnoNascimento: {
        $max: {
          $toInt: "$birthYear",
        },
      },
      menorAnoNascimento: {
        $min: "$birthYear",
      },
    },
  },
  {
    $project: {
      _id: 0,
    },
  },
]);
