const FOUR_HUNDRED = 400;
const SIX = 6;

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const regex = /\S+@\S+\.com/;
  if (!email) {
    return res.status(FOUR_HUNDRED).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!regex.test(email)) {
    return res.status(FOUR_HUNDRED)
    .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) {
    return res.status(FOUR_HUNDRED).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < SIX) {
    return res.status(FOUR_HUNDRED)
    .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  
  next();
};

const headerValidation = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (authorization.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  next();
};

const nameValidation = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};

const ageValidation = (req, res, next) => {
  const { age } = req.body;

  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
};

const talkValidation = (req, res, next) => {
  const { talk } = req.body;
  // const requiredProps = ['watchedAt', 'rate'];
  // if (requiredProps.every((e) => e in talk)) {
  //   return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  // }
  if (!talk) {
    return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  }

  next();
};

const watchedFormatValidation = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  const validDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;

  if (!watchedAt) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  if (!validDate.test(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
};

const rateValidation = (req, res, next) => {
  const { talk: { rate } } = req.body;

  if (rate === undefined) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }
  if (!Number.isInteger(rate) || rate > 5 || rate < 1) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
};

module.exports = {
  validateLogin,
  headerValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  watchedFormatValidation,
  rateValidation,
};
