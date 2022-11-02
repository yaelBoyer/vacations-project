import axios from "axios";
import VacationModel from "../Models/VacationModel";
import { vacationsStore, vacationsAction, vacationsActionType } from "../Redux/VacationState";
import config from "../Utils/Config";

class VacationsService {

    // Get all vacations from backend:
    public async getAllVacations(filterMyVacations=false): Promise<VacationModel[]> {
        // Take vacations resides in redux global state:
        let vacations = vacationsStore.getState().vacations;

        
            // Fetch all vacations from backend:

            const response = await axios.get<VacationModel[]>( config.allVacationsUrl );

            // Extract vacations from axios response:
            vacations = response.data

            if(filterMyVacations){
                vacations = vacations.filter(el => el.isFollowing)
            }
        


            // Save fetched vacations in global state:
            const action: vacationsAction = { type: vacationsActionType.FetchVacations, payload: vacations };
            vacationsStore.dispatch(action); // Redux will call vacationsReducer to perform this action.
            
        // }

        // Return vacations:
        return vacations;
    }

    // Get one vacation by id:
    public async getOneVacation(id: number): Promise<VacationModel> {

        // Desired vacation: 
        let vacation;

        // Take vacations resides in redux global state:
        let vacations = vacationsStore.getState().vacations;

        // If we have no vacations in global state - fetch given vacation from server:
        if (vacations.length === 0) {

            // Fetch one vacation from backend:
            const response = await axios.get<VacationModel>(config.allVacationsUrl + id);

            // Take fetched vacation:
            vacation = response.data;
        }
        else {

            // Take vacation from redux:
            vacation = vacations.find(p => p.vacationId === id);
        }
        if(vacation){
        const response = await axios.get(config.imagesUrl+vacation.imageName,{ responseType: "blob"});
        vacation['src'] = URL.createObjectURL(response.data)
        }
        // Return vacation:
        return vacation;
    }

    // Add new vacation: 
    public async addVacation(vacation: VacationModel): Promise<void> {

        // Convert VacationModel into FormData because we need to send text + image:
        const formData = new FormData();
        formData.append("description", vacation.description);
        formData.append("destination", vacation.destination);
        formData.append("image", vacation.image[0]);
        formData.append("arrivalDate", vacation.arrivalDate);
        formData.append("departureDate", vacation.departureDate);
        formData.append("price", vacation.price.toString());
        

        

        // Send vacation to backend: 
        const response = await axios.post<VacationModel>(config.allVacationsUrl, formData);
        const addedVacation: VacationModel = response.data;

        // Send added vacation to redux global state: 
        const action: vacationsAction = { type: vacationsActionType.AddVacation, payload: addedVacation };
        vacationsStore.dispatch(action); // Redux will call vacationsReducer to perform this action.
    }

    // Update vacation: 
    public async updateVacation(vacation: VacationModel): Promise<void> {

        // Convert VacationModel into FormData because we need to send text + image:
        const formData = new FormData();
        formData.append("description", vacation.description);
        formData.append("destination", vacation.destination);
        formData.append("image", vacation.image[0]);
        formData.append("arrivalDate", vacation.arrivalDate);
        formData.append("departureDate", vacation.departureDate);
        formData.append("price", vacation.price.toString());
        formData.append("vacationId",vacation.vacationId.toString())
        formData.append("imageName",vacation.imageName)
     

        // Send vacation to backend: 
        const response = await axios.put<VacationModel>(config.allVacationsUrl + vacation.vacationId, formData);
        const updatedVacation = response.data;

        // Send updated vacation to redux global state:
        const action: vacationsAction = { type: vacationsActionType.UpdateVacation, payload: updatedVacation };
        vacationsStore.dispatch(action); // Redux will call vacationsReducer to perform this action.
    }

    // Delete vacation: 
    public async deleteVacation(id: number): Promise<void> {

        // Delete this vacation in backend: 
        await axios.delete(config.allVacationsUrl + id);

        // Delete this vacation also in redux global state: 
        const action: vacationsAction = { type: vacationsActionType.DeleteVacation, payload: id };
        vacationsStore.dispatch(action); // Redux will call vacationsReducer to perform this action.
    }
   

    public  resetVacations() {
        const action: vacationsAction = { type: vacationsActionType.ResetVacations ,payload:'' };
        vacationsStore.dispatch(action)

        
    }

}

const vacationsService = new VacationsService();

export default vacationsService;
