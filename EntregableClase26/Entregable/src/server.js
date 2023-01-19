import { config } from 'dotenv';
config();

import express, { json, urlencoded } from 'express';
//import static from "express" SOLUCIONAR ESTE IMPORT, STRICT MODE
import exphbs from 'express-handlebars';
import session from 'express-session';
import { use, serializeUser, deserializeUser, initialize, session as _session, authenticate } from 'passport';
//const { Strategy: FacebookStrategy } = require('passport-facebook');
import { Strategy as LocalStrategy } from 'passport-local';
const app = express();

//Persistencia MongoDb
const advanceOptions = {useNewUrlParser: true, useUnifiedTopology: true};
const url = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority`;
app.use(session({
  store: MongoStore.create({mongoUrl: url, mongoOptions: advanceOptions}),
  secret: "123",
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 60000}
}));

//Middlewares
app.use(json());
app.use(urlencoded({ extended: true }));
//app.use(static('public'));

//Handlebars
app.engine('.hbs', exphbs({ extname: '.hbs', defaultLayout: 'main.hbs' }));
app.set('view engine', '.hbs');

//Conexion
const port = 8080;
const server = app.listen(port, () => console.log(`Servidor escuchando en http://localhost:${port}`));
server.on('error', error => console.log(`Error en servidor ${error}`));

//Passport
use(new LocalStrategy({
  clientID: FACEBOOK_CLIENT_ID,
  clientSecret: FACEBOOK_CLIENT_SECRET,
  callbackURL: '/auth/facebook/callback',
  profileFields: ['id', 'displayName', 'photos', 'email'],
  scope: ['email']
  }, (acessToken, refreshToken, userProfile, done) => {
    console.log('profile', userProfile);
    return done(null, userProfile);
}));

serializeUser((user, done) => {
  done(null, user);
});

deserializeUser((user, done) => {
  done(null, user);
});

//Se inicia passport y se crea una session
app.use(initialize());
app.use(_session());




const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
      next();
  } else {
      res.redirect('/login')
  }
}

// Rutas

app.get("/register", (res, req) => {
  //manda el archivo que queremos como vista
  res.sendFile(__dirname + "views/register.html");
});

app.post('/register', authenticate('register', {
  failureRedirect: '/failregister',
  successRedirect: '/'
}))

app.get('/failregister', (req, res) => {
  res.render('register-error')
})

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/views/login.html')
});

app.post('/login', authenticate('login', {
  failureRedirect: '/faillogin',
  successRedirect: '/datos'
}));

app.get('/faillogin', (req, res) => {
  res.render('login-error')
})

app.get('/datos', isAuth, (req, res) => {
  if (!req.user.contador) {
      req.user.contador = 0;
  }

  req.user.contador++;
  res.render('datos', {
      datos: usuarios.find(u => u.username === req.user.username),
      contador: req.user.contador
  });
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

app.get('/', isAuth, (req, res) => {
  res.redirect('/datos');
});



// passport config
use('register', new LocalStrategy({ passReqToCallback: true }, (req, username, password, done) => {
  const { direccion } = req.body
  const usuario = usuarios.find (u => u.username === username)
  if (usuario) {
      return done('Usuario ya registrado')
  }
  const user = {
      username,
      password,
      direccion,
  }
  usuarios.push(user)
  return done(null, user)
}));

use('login', new LocalStrategy((email, password, done) => {
  const user = usuarios.find(u => u.username === username)
  if (!user) {
      return done(null, false)
  }
  if (user.password !== password) {
      return done(null, false)
  }
  user.contador = 0;
  return done(null, user)
}));

