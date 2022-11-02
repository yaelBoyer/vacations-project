import { useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import notifyService from "../../../Services/NotifyService";
import VacationService from "../../../Services/VacationService";
import useVerifyAdmin from "../../../Utils/UserVerifyAdmin";
import "./EditVacation.css";

function EditVacation(): JSX.Element {

    useVerifyAdmin();

    const params = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, formState, setValue } = useForm<VacationModel>();
    const [arrivalDateError, setArrivalDateError] = useState<string>("");
    const [departureDateError, setDepartureDateError] = useState<string>("");


    useEffect(() => {
        const id = +params.vacId;
        VacationService.getOneVacation(id)
            .then(vacation => {
                let splitDateArrivalDate = vacation.arrivalDate.split('/')
                const arrivalDate = splitDateArrivalDate[2]+"-"+splitDateArrivalDate[1]+"-"+splitDateArrivalDate[0]
            
                let splitDateDepartureDate = vacation.departureDate.split('/')
                const departureDate = splitDateDepartureDate[2]+"-"+splitDateDepartureDate[1]+"-"+splitDateDepartureDate[0]

                setValue("vacationId", vacation.vacationId);
                setValue("description", vacation.description);
                setValue("destination", vacation.destination);
                setValue("arrivalDate", arrivalDate);
                setValue("departureDate",departureDate );
                setValue("price", vacation.price);
                setValue("imageName", vacation.imageName)

            })
            .catch(err => notifyService.error(err));
    }, []);

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
            await VacationService.updateVacation(vacation);
            notifyService.success("vacation has been updated");
            navigate("/vacations");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="EditVacation Box">

            <form onSubmit={handleSubmit(send)}>

                <h2>Edit vacation</h2>

                {/* vacation ID: */}
                <input type="hidden" {...register("vacationId")} />

                <label>Description: </label>
                <textarea maxLength={1000} className="AddTextarea"  {...register("description", {
                    required: { value: true, message: "Missing description" },
                    minLength: { value: 20, message: "Description must be minimum 20 chars" },
                    maxLength: { value: 1000, message: "Description can't exceed 1000 chars" }
                })} />
                <span>{formState.errors.description?.message}</span> {/* <span>{formState.errors.description && formState.errors.name.message}</span> */}
                
                <label>Destination: </label>
                <input type="text" {...register("destination", {
                    required: { value: true, message: "Missing destination" },
                    minLength: { value: 2, message: "Destination must be minimum 20 chars" },
                    maxLength: { value: 10000, message: "Destination can't exceed 10000 chars" }
                })} />
                <span>{formState.errors.destination?.message}</span> {/* <span>{formState.errors.destination && formState.errors.name.message}</span> */}
                
                <label>Image: </label>
                <input type="file" accept="image/*" {...register("image")} />
                
                <label>Arrival date: </label>
                <input type="date" {...register("arrivalDate", {
                    required: { value: true, message: "Missing arrival date" }
                    
                })} />
                <span>{formState.errors.arrivalDate?.message}</span> {/* <span>{formState.errors.arrivalDate && formState.errors.name.message}</span> */}
                <span>{arrivalDateError}</span>

                <label>Departure date: </label>
                <input type="date" {...register("departureDate", {
                    required: { value: true, message: "Missing departure date" }
                    
                })} />
                <span>{formState.errors.departureDate?.message}</span> {/* <span>{formState.errors.departureDate && formState.errors.name.message}</span> */}
                <span>{departureDateError}</span>

                <label>Price: </label>
                <input type="number" step="0.01" {...register("price", {
                    required: { value: true, message: "Missing price" },
                    min: { value: 0, message: "Price can't be negative" },
                })} />
                <span>{formState.errors.price?.message}</span>


                <button className="btn-default">Update</button>

            </form>

        </div>
    );
}

export default EditVacation;

