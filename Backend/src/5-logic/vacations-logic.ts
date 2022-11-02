import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import { IdNotFoundError, ValidationError } from "../4-models/client-errors";
import VacationModel from "../4-models/vacation-model";
import { v4 as uuid } from "uuid";
import safeDelete from "../2-utils/safe-delete";
import UserModel from "../4-models/user-model";



// Get all vacations: 
async function getAllVacations(user): Promise<VacationModel[]> {
    // Create sql: 
    const sql=`SELECT DISTINCT
	V.*,
	EXISTS(SELECT * FROM followers WHERE vacationId = F.vacationId AND userId = ?) AS isFollowing , DATE_FORMAT(arrivalDate,'%d/%m/%Y') arrivalDate , DATE_FORMAT(departureDate,'%d/%m/%Y') departureDate,
	COUNT(F.userId) AS followersCount
FROM vacations as V LEFT JOIN followers as F
ON V.vacationId = F.vacationId
GROUP BY vacationId
ORDER BY isFollowing DESC,arrivalDate`       

    // Get data from database: 
    const vacations = await dal.executeAsync(sql,[user.userId]);

    // Return it:
    return vacations;
}

// Get one vacation: 
async function getOneVacation(id: number): Promise<VacationModel> {
    const sql = "SELECT * FROM vacations  WHERE vacationId =?"   

    const vacations = await dal.executeAsync(sql,[id]); // returns empty array if not found

    const vacation = vacations[0];

    if (!vacation) throw new IdNotFoundError(id);

    return vacation;
}

// Add new vacation: 
async function addVacation(vacation: VacationModel): Promise<VacationModel> {
    const error = vacation.validate();
    if (error) {
        
        throw new ValidationError(error)};    

    // Handle image: 
    if (vacation.image) {
        const extension = vacation.image.name.substring(vacation.image.name.lastIndexOf(".")); // .gif / .png / .jpg / .jpeg 
        vacation.imageName = uuid() + extension;
        await vacation.image.mv("./src/1-assets/images/" + vacation.imageName); // mv = move = copy image

        delete vacation.image; // Delete file before saving.
    }
    const sql = "INSERT INTO vacations VALUES( DEFAULT,?,?,?,?,?,?)"
       
        
    
    const result: OkPacket = await dal.executeAsync(sql,[vacation.destination,vacation.description,vacation.imageName,vacation.arrivalDate,vacation.departureDate,vacation.price]);
    vacation.vacationId = result.insertId;
    return vacation;
   
}

// Update vacation: 
async function updateVacation(vacation: VacationModel): Promise<VacationModel> {

    const error = vacation.validate();
    if (error) throw new ValidationError(error);

    if (vacation.image) {
        
        await safeDelete("./src/1-assets/images/" + vacation.imageName);
        const extension = vacation.image.name.substring(vacation.image.name.lastIndexOf(".")); // .gif / .png / .jpg / .jpeg 
        vacation.imageName = uuid() + extension;
        await vacation.image.mv("./src/1-assets/images/" + vacation.imageName); // mv = move = copy image
        delete vacation.image; // Delete file before saving.
    }


    const sql = "UPDATE vacations SET description = ?,destination = ?, imageName = ?,arrivalDate =?,departureDate=?,price = ? WHERE vacationId = ?";
                    
    const result: OkPacket = await dal.executeAsync(sql,[vacation.description,vacation.destination,vacation.imageName,vacation.arrivalDate,vacation.departureDate,vacation.price,vacation.vacationId]);

    if (result.affectedRows === 0) throw new IdNotFoundError(vacation.vacationId);

    return vacation;
}

// Delete vacation: 
async function deleteVacation(id: number): Promise<void> {

    const sql = "DELETE FROM vacations WHERE vacationId = ?";

    const result: OkPacket = await dal.executeAsync(sql,[id]);

    if (result.affectedRows === 0) throw new IdNotFoundError(id);
}

//Add or remove function

async function addOrRemoveFollow(payload:{vacationId:number,addFollower:boolean ,user:UserModel} ): Promise<boolean> {
  let result :OkPacket
    if(payload.addFollower){
    const sql = `INSERT INTO followers VALUES('?', '?')`
    
     result = await dal.executeAsync(sql,[payload.user.userId,payload.vacationId]);
     
    
   }else{
    const sql = "DELETE FROM followers WHERE userId = ? AND vacationId = ?";
     result = await dal.executeAsync(sql,[payload.user.userId,payload.vacationId]);
   }
    return result.affectedRows > 0
}

export default {
    getAllVacations,
    getOneVacation,
    addVacation,
    updateVacation,
    deleteVacation,
    addOrRemoveFollow,
    
}