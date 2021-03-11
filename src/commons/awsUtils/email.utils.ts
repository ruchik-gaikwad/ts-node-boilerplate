import aws from "aws-sdk";
import config from "../../appConfig";
import logger from "../../logger";

class EmailService {
    
    private aws_ses: aws.SES;

    constructor() {
        aws.config.update({
            accessKeyId: config.AWS_CONFIG.ACCESSKEYID,
            secretAccessKey: config.AWS_CONFIG.SECRETACCESSKEY,
            region: config.AWS_CONFIG.REGION
        });
        this.aws_ses = new aws.SES({ apiVersion: "2010-12-1" });
        
    }
    
    
    public sendPasswordChnageOtp(businessid: string, email: string, otp: number, next: CallableFunction) {
        const emailAddress = [];
        emailAddress.push(email);
        const resetPasswordLink = `${config.URLS.CARBON_DASHBOARD}/auth/reset-password/${businessid}/${email}`;
        const params = {
            Source: config.AWS_CONFIG.SES_EMAIL,
			Destination: {
				BccAddresses: emailAddress
			},
            Message: {
                Body: {
                    Html: {
                      // HTML Format of the email
                      Charset: "UTF-8",
                      Data:
                        `<html><body><h4> 
                            Your password reset otp is as follows: ${otp} <br>
                          <a href=${resetPasswordLink}> Reset Link </a>  <br>
                          Link - ${resetPasswordLink}
                        </h4></body></html>
                        `
                    },
                  },
                  Subject: {
                    Charset: "UTF-8",
                    Data: "Password Reset | Svagam"
                  }
            }            
        };        
        
        const sendEmail = this.aws_ses.sendEmail(params).promise();

        sendEmail.then((data:any) => {
            logger.info(`Password Reset Email Send to user ${email}`, data);
            next(null, data);
        })
        .catch((err:Error) => {
            logger.error("Password Reset Email Failed");
            logger.error(err); 
            next(err);
        });

    }

    public sendBusinessEmployeeCreation(emails:any , data: any, password: string,  next: CallableFunction){

        const redirectUrl = `${config.URLS.CARBON_DASHBOARD}`;
        const params = {
            Source: config.AWS_CONFIG.SES_EMAIL,
			Destination: {
				BccAddresses: emails
			},
            Message: {
                Body: {
                    Html: {
                      // HTML Format of the email
                      Charset: "UTF-8",
                      Data:
                        `<html>
                        <body>
                        <h4>                              
                            Dear ${data.firstName}, </br>
                            You have been invited to <a href=${redirectUrl}> Carbon Dashboard </a> with BIN:${data.businessid}.</br>
                            Your Email - ${data.email}</br>
                            Your password is ${password}.
                            </br>
                            </br>
                            Enjoy working on Carbon!
                            </br>
                            </br>
                            From,</br>
                            Carbon Team
                        </h4>
                        </body>
                        </html>`
                    },
                  },
                  Subject: {
                    Charset: "UTF-8",
                    Data: "New Business Employee | Carbon"
                  }
            }            
        };        
        
        const sendEmail = this.aws_ses.sendEmail(params).promise();

        sendEmail.then((res:any) => {
            logger.info("New Business Employee Signup for business", res);
            next(null, res);
        })
        .catch((err:Error) => {
            logger.error("New Business Employee");
            logger.error(err); 
            next(err);
        });

    }

    public sendEamil(params: aws.SES.SendEmailRequest) {
        return this.aws_ses.sendEmail(params).promise();
    }
}


export default new EmailService();
