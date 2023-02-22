import express from "express";

const authRouter = express.Router();

authRouter.get("/auth", (req,res) => {
    res.send("Authentication")
});

export default authRouter;