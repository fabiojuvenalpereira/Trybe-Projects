const Fs = require('fs');

const fileReader = () => {
  const archive = Fs.readFileSync('talker.json');
  const parsed = JSON.parse(archive);
  return parsed;
};

module.exports = fileReader;