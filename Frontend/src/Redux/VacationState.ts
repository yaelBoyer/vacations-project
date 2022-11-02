import { createStore } from "redux";
import VacationModel from "../Models/VacationModel";

// 1. State - This is the data:
export class VacationState {
    public vacations: VacationModel[] = []; // Our global data.
}

// 2. Action Type - List of actions we can do on the above state
export enum vacationsActionType {
    FetchVacations = "FetchVacations", // Fetch all vacations from backend
    AddVacation = "AddVacation", // Add new Vacation
    UpdateVacation = "UpdateVacation", // Update existing Vacation
    DeleteVacation = "DeleteVacation" ,// Delete existing Vacation
    ResetVacations = "ResetVacations"
}

// 3. Action - Object for describing a single operation on the state: 
export interface vacationsAction {
    type: vacationsActionType; // Which operation we're going to do
    payload: any; // Which data we're sending
}

// 4. Reducer - function which performs the needed operation:
export function vacationsReducer(currentState = new VacationState(), action: vacationsAction): VacationState {

    let newState = { ...currentState }; // We must duplicate the original object

    // Do the change on the newState: 
    switch (action.type) {

        case vacationsActionType.FetchVacations: // Here payload must be all vacations fetched from the server
            newState.vacations = action.payload; // Set all fetched vacations to the state
            break;

        case vacationsActionType.AddVacation: // Here payload must be the Vacation to add
            newState.vacations.push(action.payload); // Add the new Vacation to the state
            break;

        case vacationsActionType.UpdateVacation: // Here payload must be the Vacation to update
            const indexToUpdate = newState.vacations.findIndex(p => p.vacationId === action.payload.id); // -1 if not exist
            if (indexToUpdate >= 0) {

                newState.vacations[indexToUpdate] = action.payload; // Update
            }
            break;

        case vacationsActionType.DeleteVacation: // Here payload must be id to delete
        const indexToDelete = newState.vacations.findIndex(p => p.vacationId === action.payload); // -1 if not exist
        if (indexToDelete >= 0) {
            newState.vacations.splice(indexToDelete , 1); // Delete
        }
        break;




        case vacationsActionType.ResetVacations: // Here payload must be id to delete
            newState.vacations= []
        
        break;

        
        

        }
    return newState; // return the new state
}

// 5. Store - redux object for managing the global state:
export const vacationsStore = createStore(vacationsReducer);
