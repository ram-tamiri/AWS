module.exports = (requiredScope) => {
  return (req, res, next) => {
    if (!req.scopes.includes(requiredScope.toLowerCase())) {
      return res.status(403).send('Forbidden: insufficient scope');
    }
    next();
  };
};
