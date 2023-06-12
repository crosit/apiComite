
const passport = require('passport');

function authenticate(req, res, next) {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(401).json({ message: 'Error de autenticación' });
    }

    req.user = user;
    next();
  })(req, res, next);
}

module.exports = authenticate;
