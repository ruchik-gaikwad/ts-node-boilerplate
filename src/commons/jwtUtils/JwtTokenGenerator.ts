import jwt from "jsonwebtoken";
import config from "../../appConfig";

class JwtGenerator {
    public generateJwt(userid: string, options: { roles: any }): string {

        const payload = {
            id: userid
        };
        
        const signoptions: jwt.SignOptions = {
            issuer: "carbon-api-service-master-issuer",
            subject: userid,
            audience: options.roles.reduce((acc: string, curval: string) => acc.toString() + ":"  + curval.toString(), "AUD"),
            expiresIn: "6h",
            algorithm: "HS256"
        };

        const token = jwt.sign(payload, config.AUTH_SIGNING_CONFIG.SECRET, signoptions);
        return token;

    }

}

export default JwtGenerator;