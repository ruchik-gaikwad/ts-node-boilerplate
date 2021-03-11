import jwt from "jsonwebtoken";
import config from "../../appConfig";
import logger from "../../logger";


class JwtVerify {

    public decodeJwt(token: string) : any {
        
       try {
           const payload = jwt.decode(token);
           return payload;
       } catch (error) {
           logger.error("-------------ERROR:: decoding the token :: Start-----------");
           logger.error(error);
           throw new Error("Error decoding the payload");
       }

    }


    public verfyJwt(token: string, next: CallableFunction): any  {

        const payload: any  = this.decodeJwt(token);            
            const verifyOptions: jwt.VerifyOptions = {
                issuer:  "carbon-api-service-master-issuer",
                subject:  payload.sub,
                audience:  payload.aud,    // roles/scope of the token *Have to be replaced by regex
                algorithms:  ["HS256"]
            }; 

            jwt.verify(token, config.AUTH_SIGNING_CONFIG.SECRET, verifyOptions, (err, decodeJwt) => {
                if(err) {
                     next(err);
                } else {
                     next(null, decodeJwt);
                }
            });
    }
}


export default new JwtVerify();