import {  useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import notifyService from "../../../Services/NotifyService";
import VacationService from "../../../Services/VacationService";
import useVerifyAdmin from "../../../Utils/UserVerifyAdmin";
import "./AddVacation.css";

function AddVacation(): JSX.Element {

    useVerifyAdmin();

    const { register, handleSubmit, formState } = useForm<VacationModel>();

    const navigate = useNavigate();

    const [arrivalDateError, setArrivalDateError] = useState<string>("");
    const [departureDateError, setDepartureDateError] = useState<string>("");

    async function send(vacation: VacationModel) {
        try {
            const now = new Date().toISOString().slice(0,10);
            if (vacation.arrivalDate < now) {
                setArrivalDateError("The Date passed");               
                return;
            }
            setArrivalDateError("");
            if (vacation.arrivalDate > vacation.departureDate) {
                setDepartureDateError("The Arrival-date must be before Departure-date");
                return;
            }
            await VacationService.addVacation(vacation);
            notifyService.success("vacation has been added");
            navigate("/vacations");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="addVacation Box">

            <form onSubmit={handleSubmit(send)}>

                <h2>Add vacation</h2>

                <label>Description: </label>
                <textarea maxLength={1000} className="AddTextarea"  {...register("description", {
                    required: { value: true, message: "Missing description" },
                    minLength: { value: 20, message: "Description must be minimum 20 chars" },
                    maxLength: { value: 1000, message: "Description can't exceed 1000 chars" }
                })} />
                <span>{formState.errors.description?.message}</span> {/* <span>{formState.errors.description && formState.errors.name.message}</span> */}
                
                <br/>
                <br/>

                <label>Destination: </label>
                <input type="text" {...register("destination", {
                    required: { value: true, message: "Missing destination" },
                    minLength: { value: 2, message: "Destination must be minimum 2 chars" },
                    maxLength: { value: 1000, message: "Destination can't exceed 1000 chars" }
                })} />
                <span>{formState.errors.destination?.message}</span> {/* <span>{formState.errors.destination && formState.errors.name.message}</span> */}
                
                <br/>
                <br/>

                <label>Image: </label>
                <input type="file" accept="image/*" {...register("image",{
                required: { value: true, message: "Missing image" },
})} />
<span>{formState.errors.image?.message}</span>

                <br/>
                <br/>
                
                <label>Arrival date: </label>
                <input type="date" {...register("arrivalDate", {
                    required: { value: true, message: "Missing arrivalDate" 
                    }
                    
                    
                })} />
                <span>{formState.errors.arrivalDate?.message}</span> {/* <span>{formState.errors.arrivalDate && formState.errors.name.message}</span> */}
                <span>{arrivalDateError}</span>

                <br/>
                <br/>

                <label>Departure date: </label>
                <input type="date" {...register("departureDate", {
                    required: { value: true, message: "Missing departureDate" }
                    
                })} />
                <span>{formState.errors.departureDate?.message}</span> {/* <span>{formState.errors.departureDate && formState.errors.name.message}</span> */}
                <span>{departureDateError}</span>
                
                <br/>
                <br/>

                <label>Price: </label>
                <input type="number" step="0.01" {...register("price", {
                    required: { value: true, message: "Missing price" },
                    min: { value: 0, message: "Price can't be negative" },
                    max: { value: 4000, message: "Price can't exceed 4000" },
                })} />
                <span>{formState.errors.price?.message}</span>

                <br/>
                <br/>               

                <button className="btn-default">Add</button>

            </form>

        </div>
    );
}

export default AddVacation;

