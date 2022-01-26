const tokenGenerate = () => {
  const getRandomstring = (Math.random() + 1).toString(20).substr(2);
  const token = (getRandomstring + getRandomstring).substr(1, 16);
  return token;
};

module.exports = tokenGenerate;
