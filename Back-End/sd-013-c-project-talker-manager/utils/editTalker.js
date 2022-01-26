const setTalker = require('./setTalker');

const editTalker = (req, archive) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;

  const newArchive = [...archive].map((talker) => {
    if (talker.id === Number(id)) {
      return {
        ...talker,
        name,
        age,
        talk,
      };
    }
    return talker;
  });
  
  setTalker(newArchive);

  return newArchive.find((talker) => talker.id === Number(id));
};

module.exports = editTalker;