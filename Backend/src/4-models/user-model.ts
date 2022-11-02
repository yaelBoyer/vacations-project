import RoleModel from "./role-model";
import Joi from "joi";

class UserModel{
    public userId:number;
    public firstName:string;
    public lastName:string;
    public username:string;
    public password:string;
    public roleId: RoleModel;

    public constructor(user:UserModel){
        this.userId= user.userId;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.username = user.username;
        this.password = user.password;
        this.roleId = user.roleId
    }
    private static validationSchema = Joi.object({
        userId: Joi.number().optional().positive().integer(),
        firstName: Joi.string().required().min(2).max(100),
        lastName: Joi.string().required().min(2).max(100),
        username: Joi.string().required().min(4).max(100),
        password: Joi.string().required().min(3).max(100),
        roleId: Joi.string().optional().min(4).max(100)
    });

    public validate(): string {
        const result = UserModel.validationSchema.validate(this);
        return result.error?.message;
    }
}

export default UserModel;