import bcrypt from "bcrypt";
import uuid from "../uuidUtil";

export const users = {
    carbonAdminUsers: [
        {
            id: uuid.generateCustomDocumentId(),
            email: "carbon_admin1@svagam.com", 
            password: bcrypt.hashSync("strongpassword", 6), 
            firstName: "carbon", 
            lastName: "admin-1", 
            phoneNo: "1234567890", 
            role: ["CARBON_ADMIN"]
        }, 
        {
            id: uuid.generateCustomDocumentId(),
            email: "carbon_admin2@svagam.com", 
            password: bcrypt.hashSync("strongpassword", 6), 
            firstName: "carbon",
            lastName: "admin-2", 
            phoneNo: "9876543210", 
            role: ["CARBON_ADMIN"] 
        }, 
        {
            id: uuid.generateCustomDocumentId(),
            email: "carbon_admin3@svagam.com", 
            password: bcrypt.hashSync("strongpassword", 6), 
            firstName: "carbon", 
            lastName: "admin-3", 
            phoneNo: "9898979999", 
            role: ["CARBON_ADMIN"]
        }

    ]
};