const setTalker = require('./setTalker');

const deleteTalker = (req, archive) => {
  const { id } = req.params;
  const newArchive = [...archive].map((talker) => {
    let deletedId;
    if (Number(talker.id) !== Number(id)) {
      deletedId = {
        ...talker,
      };
    }
    return deletedId;
  });

  setTalker(newArchive);

  return {
    message: 'Pessoa palestrante deletada com sucesso',
  };
};

module.exports = deleteTalker;