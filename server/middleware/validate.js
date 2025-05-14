module.exports = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: 'Entrada inválida', details: error.details });
    }
    next();
  };
};
