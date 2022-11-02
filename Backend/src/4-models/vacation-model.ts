import { UploadedFile } from "express-fileupload";
import Joi from "joi";

class VacationModel{
    public vacationId:number;
    public destination:string;
    public description:string;
    public image: UploadedFile;
    public imageName:string;
    public arrivalDate:string;
    public departureDate:string;
    public price:string;
    public followers:number;

    public constructor(vacation:VacationModel){
        this.vacationId = vacation.vacationId,
        this.destination = vacation.destination,
        this.description = vacation.description,
        this.image = vacation.image,
        this.imageName = vacation.imageName,
        this.arrivalDate = vacation.arrivalDate,
        this.departureDate = vacation.departureDate,
        this.price = vacation.price,
        this.followers = vacation.followers

    }

    private static validationSchema = Joi.object({
        vacationId: Joi.number().optional().positive().integer(),
        description: Joi.string().required().min(2).max(1000),
        destination: Joi.string().required().min(2).max(100),
        image: Joi.optional(),
        imageName: Joi.optional(),
        arrivalDate: Joi.string().required().min(4).max(100),
        departureDate: Joi.string().required().min(4).max(100),
        price: Joi.number().required().min(500).max(4000),
        followers: Joi.number().min(4).max(100)
    });

    public validate(): string {
        const result = VacationModel.validationSchema.validate(this);
        return result.error?.message;
    }

    
}

export default VacationModel;