const config = {
    NAME: process.env.NAME || "Service Name",
    MONGO_URL: process.env.MONGO_URL ||  "mongodb://memoir:m3M0ir@dev-ip:27017/memoirdb?authSource=admin&authMechanism=SCRAM-SHA-256",
    PORT: process.env.PORT || 3000 
};

export default config;