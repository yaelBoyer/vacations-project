import { OkPacket } from "mysql";
import auth from "../2-utils/auth";
import hash from "../2-utils/cyber";
import dal from "../2-utils/dal";
import { UnauthorizedError, ValidationError } from "../4-models/client-errors";
import CredentialsModel from "../4-models/credentials-model";
import RoleModel from "../4-models/role-model";
import UserModel from "../4-models/user-model";

async function register(user: UserModel): Promise<string> { // Returning a new token
    
    // Validate: 
    const error = user.validate();
    if (error) throw new ValidationError(error);
    // Create minimum role: 
    user.roleId = RoleModel.User;
    user.password = hash(user.password);
    const sql = "INSERT INTO users VALUES(DEFAULT,?,?,?,?,?)"
        
        
    const result: OkPacket = await dal.executeAsync(sql,[user.firstName,user.lastName,user.username,user.password,user.roleId]);
    user.userId = result.insertId;



    // Delete password: 
    delete user.password;

    // Generate new token: 
    const token = auth.generateNewToken(user);

    return token;
}

async function login(credentials: CredentialsModel): Promise<string> {

    // Validate: 
    const error = credentials.validate();
    if (error) throw new ValidationError(error);

    credentials.password = hash(credentials.password);

    // Get users from file: 
    const user = await getAllUsers(credentials);
       
    // If no such user exists: 
    if (!user[0].userId) throw new UnauthorizedError("Incorrect username or password");

    // Delete password: 
    delete user.password;

    // Generate new token: 
    const token = auth.generateNewToken(user[0]);

    return token;
}


// Get all users: 
async function getAllUsers(user): Promise<UserModel> {

    // Create sql: 

    const sql =`SELECT * FROM users WHERE username = ? AND password = ?`;
                    
    // Get data from database: 
    const users = await dal.executeAsync(sql,[user.username,user.password]);

    // Return it:
    return users;
}
async function usernameExists(username: string): Promise<boolean> {
    // getting amount of users with 'username' 
    const sqlQuery = `SELECT
                        COUNT(*) AS usersWithName
                        FROM users
                        WHERE username = ?`;
    const users = await dal.executeAsync(sqlQuery, [username]);
    // if there are more than 0, the username exists.
    return users[0].usersWithName > 0;
}



export default {
    register,
    login,
    usernameExists
};
