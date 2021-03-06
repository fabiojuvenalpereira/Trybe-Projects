db.movies.aggregate([
  {
    $match: {
      "imdb.rating": { $gte: 7 },
      $nor: [
        { genres: "Crime" },
        { genres: "Horror" },
      ],
      $or: [
        { rated: "PG" },
        { rated: "G" },
      ],
      languages: { $all: ["English", "Spanish"] },
    },
  },
  {
    $project: {
      _id: 0,
      titulo: "$title",
      avaliado: "$rated",
      notaIMDB: "$imdb.rating",
      votosIMDB: "$imdb.votes",
      ano: "$year",
    },
  },
]);
