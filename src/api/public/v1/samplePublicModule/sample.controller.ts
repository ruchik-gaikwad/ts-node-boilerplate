import { Request, Response, NextFunction } from "express";
import HttpException from "../../../../commons/httpExceptions/httpException";

class SampleController {

    public sampleMethod(reqest: Request, response: Response, next: NextFunction) {
        try {

            response.status(200).send({
                query: reqest.query,
                result: {
                    message: "Reached at the public place"
                }, 
                error: null

            });

        } catch (err) {
            next(new HttpException(400, "Somwthing went wrong in Public"));
        }
    }
}

export default new SampleController();