import express from "express";

const registerRouter = express.Router();

registerRouter.get("/register", (req,res) => {
    res.render("register", { title: "Register" })
});

export default registerRouter;