const express = require('express');
const router = express.Router();
const axios = require('axios');
const User = require('../models/user');

const getGoogleAuthUrl = () => {
  const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
  const options = {
    redirect_uri: process.env.GOOGLE_CALLBACK_URL,
    client_id: process.env.GOOGLE_CLIENT_ID,
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: ['openid', 'profile', 'email'].join(' ')
  };
  const qs = new URLSearchParams(options);
  return `${rootUrl}?${qs.toString()}`;
};

router.get('/google', (req, res) => {
  const authUrl = getGoogleAuthUrl();
  res.redirect(authUrl);
});

router.get('/google/callback', async (req, res) => {
  const { code } = req.query;
  if (!code) return res.status(400).send('No code provided');

  try {
    const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_CALLBACK_URL,
      grant_type: 'authorization_code'
    });
    const { access_token } = tokenResponse.data;

    const profileResponse = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
      headers: { Authorization: `Bearer ${access_token}` }
    });
    const profile = profileResponse.data;

    let user = await User.findOne({ googleId: profile.id });
    if (!user) {
      user = await User.create({
        googleId: profile.id,
        name: profile.name,
        email: profile.email,
        avatar: profile.picture
      });
    }

    req.session.user = user;
    req.session.isAuthenticated = true;
    res.redirect('/profile');
  } catch (error) {
    console.error('OAuth error:', error.response?.data || error.message);
    res.status(500).send('Authentication failed');
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: 'Logout error' });
    res.redirect('/');
  });
});

module.exports = router;