import { Response, NextFunction } from "express";
import logger from "../logger";
import JwtVerify from "./jwtUtils/JwtVerify";
import { InvalidToken } from "./Errors";
import HttpException from "./httpExceptions/httpException";


class Verifytoken {

    public verifyProtectedApiToken(req: any, res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization;

        try {

            if (authHeader == undefined || authHeader.split(" ")[0] !== "Bearer") {
                throw new HttpException(401, "Unauthorised. Token invalid");
            }

            const token = authHeader.split(" ")[1];

            JwtVerify.verfyJwt(token, (err: Error, decodeJwt: boolean) => {
                if (err) {
                    throw new InvalidToken("Invalid Token");
                } else {
                    req.claims = decodeJwt;
                    next();
                }
            });

        } catch (error) {
            logger.error("--------Error verifying the token ----------");
            res.status(401).send({ message: "Unauthorised. Token invalid" });
        }
    }



    public verifyRole(role: string[]) {

        return function (req: any, res: Response, next: NextFunction) {
            const scope = req.claims.aud.split(":")[1];
            if (role.indexOf(scope) > -1) {
                next();
            } else {
                throw new HttpException(403, "Access Denied");
            }
        };

    }

}


export default new Verifytoken();