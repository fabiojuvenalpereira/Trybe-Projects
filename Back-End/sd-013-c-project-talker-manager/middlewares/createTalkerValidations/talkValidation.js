const valiDate = (date) => {
  const dateRegex = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/; // 1
  if (dateRegex.test(date)) return true;
  return false;
};

const talkExists = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) {
    return next(res.status(400)
      .json({
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
      })); 
  } 
  next();
};

const talkValidationWatchedAt = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  const date = watchedAt;
  
  if (watchedAt === undefined) {
    return next(res.status(400)
      .json({
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    }));
  }

  if (!valiDate(date)) { 
    return next(res.status(400)
      .json({
        message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    }));
  }
  
  next();
};

const talkValidationRate = (req, res, next) => {
  const { talk: { rate } } = req.body;

  if (rate === undefined) {
    return next(res.status(400)
      .json({
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    }));
  }

  if (rate < 1 || rate > 5) { 
    return next(res.status(400)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' }));
  }

  next();
};

module.exports = {
  talkExists,
  talkValidationWatchedAt,
  talkValidationRate,
};

// REFERÊNCIAS
// 1- referência retirada do fórum stackoverflow