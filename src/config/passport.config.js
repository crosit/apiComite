const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const bcrypt = require('bcrypt');
const {getByEmailUser,getByIdUser} = require('../components/auth/auth.repository');
const config = require('./config');
const { ExtractJwt } = require('passport-jwt');

const jwtOptions = { 
    secretOrKey: config.SECRET_KEY,
    JwtStrategy: 'jwt',
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
 }
function initializePassport(passport) {
  
    passport.use(
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
      try {
        const user = await getByEmailUser( email );
        

        if (!user) {
          return done(null, false, { message: 'Usuario no encontrado' });
        }
        const isMatch = await bcrypt.compare(password, user[0].contrasena);

        if (!isMatch) {
          return done(null, false, { message: 'Contraseña incorrecta' });
        }
        return done(null, user);
      } catch (error) {
        console.log(error);
        return done(error);
      }
    })
  );

  passport.use(
    new JwtStrategy(jwtOptions, async (payload, done) => {
        const user = await getByIdUser(payload.id);
        done(null, user);
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await getByIdUser(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
}

module.exports = initializePassport;
