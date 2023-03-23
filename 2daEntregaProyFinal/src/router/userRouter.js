import express from "express";
//import usuariosSchema from "../model/usuarios";
const userRouter = express.Router();

/* const isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/login')
    }
} */

userRouter.get("/register", (res, req) => {
    res.sendFile(__dirname + "views/register.html");
});

userRouter.post('/register', (res,req) => ('register', {
    failureRedirect: '/failregister',
    successRedirect: '/'
}))

userRouter.get('/failregister', (req, res) => {
    res.render('register-error')
})

userRouter.get('/login', (req, res) => {
    res.sendFile(__dirname + '/views/login.html')
});

userRouter.post('/login', (req, res) => ('login', {
    failureRedirect: '/faillogin',
    successRedirect: '/datos'
}));

userRouter.get('/faillogin', (req, res) => {
    res.render('login-error')
})

/* userRouter.get('/datos', isAuth, (req, res) => {
        if (!req.user.contador) {
            req.user.contador = 0;
        } */

userRouter.get('/datos', (req, res) => {
    if (!req.user.contador) {
        req.user.contador = 0;
    }
    req.user.contador++;
    res.render('datos', {
        datos: usuarios.find(u => u.username === req.user.username),
        contador: req.user.contador
    });
});

userRouter.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

userRouter.get('/', (req, res) => {
    res.redirect('/datos');
});

/* userRouter.get('/', isAuth, (req, res) => {
    res.redirect('/datos');
}); */
export default userRouter;