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

module.exports = {
  validateLogin,
};
