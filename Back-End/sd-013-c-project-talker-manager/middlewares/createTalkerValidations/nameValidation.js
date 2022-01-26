const nameValidation = (req, res, next) => {
  const { name } = req.body;
  
  if (!name || !name.length) {
    return next(res.status(400).json({ message: 'O campo "name" é obrigatório' }));
  }

  if (name.length < 3) {
    return next(res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' }));
  }

  next();
};

module.exports = {
  nameValidation,
};
