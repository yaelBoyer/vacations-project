import express, { NextFunction, Request, Response } from "express";
import path from "path";

import verifyAdmin from "../3-middleware/verify-admin";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import VacationModel from "../4-models/vacation-model";
import vacationsLogic from "../5-logic/vacations-logic";
import jwt from "jsonwebtoken"; // npm i jsonwebtoken @types/jsonwebtoken


// Take only the router mechanism from express: 
const router = express.Router();

// GET http://localhost:3005/api/vacations
router.get("/api/vacations",verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const header = request.header("authorization")
        const token = header.substring(7);
        const user = jwt.decode(token);
        const vacations = await vacationsLogic.getAllVacations(user['user']);
        response.json(vacations); // status: 200 - OK
    }
    catch (err: any) {
        next(err); // Jumping to catchAll middleware.
    }
});



// GET http://localhost:3005/api/vacations/:id
router.get("/api/vacations/:id",verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        const vacation = await vacationsLogic.getOneVacation(id);
        
        response.json(vacation); // status: 200 - OK
    }
    catch (err: any) {
        next(err); // Jumping to catchAll middleware.
    }
});

// POST http://localhost:3005/api/vacations
router.post("/api/vacations",verifyAdmin,  async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.image = request.files?.image; // Here are the files given from the front.
        const vacation = new VacationModel(request.body);
        const addedVacation = await vacationsLogic.addVacation(vacation);
        response.status(201).json(addedVacation); // status: 201 - Created
    }
    catch (err: any) {
        next(err); // Jumping to catchAll middleware.
    }
});





// PUT http://localhost:3005/api/vacations/:id
router.put("/api/vacations/:id", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.image = request.files?.image; // Here are the files given from the front.
        const id = +request.params.id;
        request.body.id = id; // Set the route id into the body
        const vacation = new VacationModel(request.body);
        const updatedVacation = await vacationsLogic.updateVacation(vacation);
        response.json(updatedVacation); // status: 200 - OK
    }
    catch (err: any) {
        next(err); // Jumping to catchAll middleware.
    }
});

// DELETE http://localhost:3005/api/vacations/:id
router.delete("/api/vacations/:id",verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        await vacationsLogic.deleteVacation(id);
        // response.status(204).json(); // status: 204 - No Content
        response.sendStatus(204); // status: 204 - No Content
    }
    catch (err: any) {
        next(err); // Jumping to catchAll middleware.
    }
});

// HANDLE IMAGES http://localhost:3005/api/getImage/:imageName
router.get("/api/getImage/:imageName", async (request: Request, response: Response, next: NextFunction) => {
   
    try {
        const imageName = request.params.imageName;
        const absolutePath = path.join(__dirname,"..","1-assets","images",imageName)
        response.sendFile(absolutePath)
        
       
    }
    catch (err: any) {
        next(err); // Jumping to catchAll middleware.
    }
});

// ADD OR REMOVE FOLLOW http://localhost:3005/api/vacations/addOrRemoveFollow
router.post("/api/vacations/addOrRemoveFollow",verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const header = request.header("authorization")
        const token = header.substring(7);
        const userObj = jwt.decode(token);
       const user =  userObj['user']
       const res =  await vacationsLogic.addOrRemoveFollow({vacationId:request.body.vacationId,addFollower:request.body.addFollower,user});
        response.json({success:res}); 
    }
    catch (err: any) {
        next(err); // Jumping to catchAll middleware.
    }
});



export default router;
