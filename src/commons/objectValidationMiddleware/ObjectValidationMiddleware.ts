import { RequestHandler } from "express";
import { validate, ValidationError } from "class-validator";
import { plainToClass } from "class-transformer";
import logger from "../../logger";
import HttpException from "../httpExceptions/httpException";

class ObjectVidationMiddleware {

    public validationMiddleware<T>(type: any, skipMissingProperties: boolean): RequestHandler {
        return (req, res, next) => {
            validate(plainToClass(type, req.body), { skipMissingProperties })
                .then((errors: ValidationError[]) => {
                    if (errors.length > 0) {
                        logger.error("ERROR:: request landed with the incorrect data type");
                        logger.error(errors);
                        const message = errors.map((error: ValidationError | any) => Object.values(error.constraints)).join(", ");
                        next(new HttpException(400, message));
                    } else {
                        next();
                    }
                });
        };
    }

}


export default new ObjectVidationMiddleware();