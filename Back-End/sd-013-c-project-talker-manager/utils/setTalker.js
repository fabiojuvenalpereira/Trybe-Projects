const Fs = require('fs');

const setTalker = (archive) => {
  const parsed = JSON.stringify(archive);
  Fs.writeFileSync('talker.json', parsed);
};

module.exports = setTalker;