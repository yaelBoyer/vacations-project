class Config {
    public registerUrl = "http://localhost:3005/api/auth/register/";
    public loginUrl = "http://localhost:3005/api/auth/login/";
    public authURL = "http://localhost:3005/api/auth";
    public addOrRemoveFollowUrl = "http://localhost:3005/api/vacations/addOrRemoveFollow/";
    public allVacationsUrl = "http://localhost:3005/api/vacations/";
    public imagesUrl = "http://localhost:3005/api/getImage/";
    public allVacationsUrlFilter = "http://localhost:3005/api/vacations/filter";

    
}

const config = new Config();

export default config;
