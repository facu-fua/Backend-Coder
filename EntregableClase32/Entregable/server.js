import { config } from 'dotenv';
config();

import express, { json, urlencoded } from 'express';
//import static from "express" SOLUCIONAR ESTE IMPORT, STRICT MODE
import exphbs from 'express-handlebars';
import session from 'express-session';
//import { use, serializeUser, deserializeUser, initialize, session as _session, authenticate } from 'passport';
//const { Strategy: FacebookStrategy } = require('passport-facebook');
//import { Strategy as LocalStrategy } from 'passport-local';
import mongoConnection from "./src/config/mongoDbAtlas.js";
import userRouter from './src/routes/userRouter.js';
import infoRouter from './src/routes/infoRouter.js';
import randomRouter from './src/routes/randomsRouter.js';

const app = express();

//Conexion a MongDb
mongoConnection();

//Persistencia sesion MongoDb
//const advanceOptions = {useNewUrlParser: true, useUnifiedTopology: true};
//const url = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority`;
app.use(session({
  //store: MongoStore.create({mongoUrl: url, mongoOptions: advanceOptions}),
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
app.engine('.hbs', exphbs.engine({ extname: '.hbs', defaultLayout: 'main.hbs' }));
app.set('view engine', '.hbs');

//Conexion
const port = parseInt(process.argv[2]) || 8080;
const server = app.listen(port, () => console.log(`Servidor express escuchando en http://localhost:${port} - PID ${process.pid}`));
server.on('error', error => console.log(`Error en servidor ${error}`));

// Rutas
app.use("/", userRouter);
app.use("/", infoRouter);
app.use("/", randomRouter);

//Passport
/*use(new LocalStrategy({
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
}));*/

