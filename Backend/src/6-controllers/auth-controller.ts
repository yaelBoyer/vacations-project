import express, { NextFunction, Request, Response } from "express";
import CredentialsModel from "../4-models/credentials-model";
import UserModel from "../4-models/user-model";
import authLogic from "../5-logic/auth-logic";

const router = express.Router();

router.get("/api/auth/:username", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const exists = await authLogic.usernameExists(req.params.username);
        res.json(exists);
    }
    catch (err: any) {
        next(err);
    }
});

// POST http://localhost:3005/api/auth/register
router.post("/api/auth/register", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = new UserModel(request.body);
        const token = await authLogic.register(user);
        response.status(201).json(token);
    }
    catch (err: any) {
        next(err); // Jumping to catchAll middleware.
    }
});

// POST http://localhost:3005/api/auth/login
router.post("/api/auth/login", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const credentials = new CredentialsModel(request.body);
        const token = await authLogic.login(credentials);
        response.json(token);
    }
    catch (err: any) {
        next(err); // Jumping to catchAll middleware.
    }
});

export default router;
