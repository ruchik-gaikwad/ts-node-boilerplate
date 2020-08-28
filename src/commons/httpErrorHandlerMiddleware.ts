import { Request, Response } from "express";

import HttpException from "./httpExceptions/httpException";

function errorMiddleware(error: HttpException, req: Request, res: Response): void {
    const status: number = error.status;
    const message: string = error.message;

    res.status(status).send({
        query: null, 
        error: message,
        result: null
    });
}

export default errorMiddleware;