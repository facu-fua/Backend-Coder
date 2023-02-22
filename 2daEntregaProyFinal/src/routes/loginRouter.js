import express from "express";

const loginRouter = express.Router();

loginRouter.get("/login", (req,res) => {
    res.render("login", { title: "Login" });
});

export default loginRouter;