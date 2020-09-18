/**
 * 
 * @file initilize the express application
 * 
 * @author Ruchik Gaikwad
 * 
 */

import express from "express";
import { Request, Response } from "express";
import bodyParser from "body-parser";
import { MongoError } from "mongodb";
import mongoose from "mongoose";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import errMiddleware from "./commons/httpErrorHandlerMiddleware";
import config from "./appConfig";
import publicV1APIs from "./api/public";
import privateV1APIs from "./api/private";
import internalV1APIs from "./api/internal";
import logger from "./logger";


export default class App {
    public app: express.Application;
    public port: number | string;
    
    constructor(port:number | string) {
        this.app = express();
        this.port = port;
        this.connectToDataBases();
        this.initializeMiddlewares();
        this.initializeAPIs();
        this.initializeErrorHandling();
        this.echo();

    }

    public initializeAPIs(): void {
        this.app.use("/public", publicV1APIs);
        this.app.use("/private", privateV1APIs);
        this.app.use("/internal", internalV1APIs);
    }

    public initializeErrorHandling(): void {
        this.app.use(errMiddleware);
    }
    
    public initializeMiddlewares(): void {
        this.app.use(cookieParser());
        this.app.use(bodyParser.json());
        morgan.token("time", () => Date().toString());
        this.app.use(morgan("[:time] :remote-addr :method :url :status :res[content-length] :response-time ms"));
        this.app.use(helmet());
    }



    public connectToDataBases(): void {
        mongoose.connect(config.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true}, (err: MongoError) => {
            if(err) {
                logger.error("ERROR Connecting the database", JSON.stringify(err, null, 2));
            } else {
                logger.info("\n*************MONGODB connected**************\n");
            }
        });
    }

    public echo(): void {
        this.app.get("/:ping", (req: Request, res: Response) => {
            if(req.params.ping === "ping") {
                res.status(200).send({
                    "ping": "pong" 
                });
            } else {
                res.status(400).send({
                    message: "Invalid Request"
                });
            }
        });
    }

    public listen(): void {
        this.app.listen(this.port, () => {
            logger.debug(`Server Started At Port ${this.port}`);
        });
    }
}