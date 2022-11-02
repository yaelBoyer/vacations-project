class Config {
    public port = 3005;
    public mysqlHost = "localhost";
    public mysqlUser = "root";
    public mysqlPassword = "";
    public mysqlDatabase = "vacation"; // Must fill in...
}

const config = new Config();

export default config;
