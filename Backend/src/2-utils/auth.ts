import UserModel from "../4-models/user-model";
import jwt from "jsonwebtoken"; // npm i jsonwebtoken @types/jsonwebtoken
import RoleModel from "../4-models/role-model";

const secretKey = "MyTouristAttractionProject";

function generateNewToken(user: UserModel): string {

    // Create object to insert inside the token: 
    const container = { user };

    // Generate new token: 
    const token = jwt.sign(container, secretKey, { expiresIn: "2h" });

    return token;
}

function verifyToken(authHeader: string): Promise<boolean> {

    return new Promise<boolean>((resolve, reject) => {

        try {

            // If there is no header: 
            if (!authHeader) {
                resolve(false);
                return;
            }

            // Extract the token, format: "Bearer token"
            //                             01234567
            const token = authHeader.substring(7);

            // If there is no token: 
            if (!token) {
                resolve(false);
                return;
            }

            // Verify the token: 
            jwt.verify(token, secretKey, err => {

                // If token expired or illegal: 
                if (err) {
                    resolve(false);
                    return;
                }

                // Here the token is valid: 
                resolve(true);

            });

        }
        catch (err: any) {
            reject(err);
        }

    });

}

function getUserRoleFromToken(authHeader: string): RoleModel {

    // Extract the token, format: "Bearer token"
    //                             01234567
    const token = authHeader.substring(7);

    // Get container which contains the user: 
    const container = jwt.decode(token) as { user: UserModel };

    // Get the user: 
    const user = container.user;

    // Get user role: 
    const role = user.roleId;

    return role;
}

export default {
    generateNewToken,
    verifyToken,
    getUserRoleFromToken
};