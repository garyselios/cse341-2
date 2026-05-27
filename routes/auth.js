const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/google',
  passport.authenticate('google', { scope: ['openid', 'profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/profile');
  }
);

router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ message: 'Logout error' });
    res.redirect('/');
  });
});

module.exports = router;