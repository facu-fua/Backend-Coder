import express from "express";

const confirmationRouter = express.Router();

confirmationRouter.get("/login", (req,res) => {
    res.render("confirmation", { title: "Confirmation", jsFile: "confirmation.js" });
});

export default confirmationRouter;