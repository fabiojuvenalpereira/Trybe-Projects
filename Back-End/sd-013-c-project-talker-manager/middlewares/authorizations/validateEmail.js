const validateEmail = (req, res, next) => {
  const { email } = req.body;

  const regex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/; // 1
  
  if (!email || !email.length) {
    return next(res.status(400)
    .json({ message: 'O campo "email" é obrigatório' }));
  }

  if (regex.test(email) === false) {
    return next(res.status(400)
    .json({ message: 'O "email" deve ter o formato "email@email.com"' }));
  }

  return next();
};

module.exports = validateEmail;

// REFERÊNCIAS
// 1 - referência de regex retirado do  fórum stackoverflow https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail