const ageValidation = (req, res, next) => {
  const { age } = req.body;
  
  if (typeof age !== 'number' || !age) {
    return next(res.status(400)
      .json({ message: 'O campo "age" é obrigatório' }));
  }

  if (age < 18) {
    next(res.status(400)
      .json({ message: 'A pessoa palestrante deve ser maior de idade' }));
  }

  next();
};

module.exports = ageValidation;