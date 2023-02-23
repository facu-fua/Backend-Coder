import express from "express";

const signupRouter = express.Router();

signupRouter.get("/signup", (req,res) => {
    res.render("signup", { title: "Signup", jsFile: "signup.js"  })
});

export default signupRouter;