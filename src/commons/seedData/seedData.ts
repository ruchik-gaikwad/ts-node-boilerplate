import DbUtils from "../db/crud";
import CarbonAdminModel from "../../appModules/authModule/carbonAdmin/carbonAdmin.entity"; 
import { users } from "./users";
import logger from "../../logger";




class SeedData {


    public adminUsers() {
            const query = new DbUtils(CarbonAdminModel); 
            try {
                const allQuries = users.carbonAdminUsers.map(e => {
                    return query.createAndUpdateDocumentByEmail(e);
                });

                Promise.all(allQuries).then(data => {
                    logger.info("---------------------DATA SEEDED--------------"); 
                    logger.info(JSON.stringify(data)); 
                }).catch((error: Error) => {
                    logger.error("---------------------DATA SEED FAILED---------");
                    logger.error(error);
                });
            } catch (error) {
                    logger.error("---------------------DATA SEED FAILED---------");
                    logger.error(error);
            }
    }

} 


export default new SeedData();



