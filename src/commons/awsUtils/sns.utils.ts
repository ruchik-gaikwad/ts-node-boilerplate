import aws from "aws-sdk";
import config from "../../appConfig";

class SnsUtils {

    private sns: aws.SNS; 

    constructor() {
        
        aws.config.update({
            accessKeyId: config.AWS_CONFIG.ACCESSKEYID,
            secretAccessKey: config.AWS_CONFIG.SECRETACCESSKEY,
            region: config.AWS_CONFIG.REGION
        });
        
        this.sns = new aws.SNS({ apiVersion: "2010-03-31" }); 
    }
    

    public sendOtp( params: { PhoneNumber: string, Message: string }) {
        return this.sns.publish(params).promise();
    }

}


export default new SnsUtils();