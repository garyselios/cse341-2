const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.isAuthenticated) {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized. Please log in.' });
};

module.exports = isAuthenticated;