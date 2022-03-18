module.exports = (err, _req, res, _next) => {
  if (err.status) {
    console.log(err);
    return res.status(err.status).json(err.error);
  }

  console.log(err);
  return res.status(500).json({ message: 'erro interno' });
};
