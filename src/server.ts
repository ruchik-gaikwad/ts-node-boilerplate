/**
 * @description Entry Point for the Application
 * 
 */

import App from "./app";

import config from "./appConfig";


process.stdout.write("\n*******************************************************************************************************************************\n");

process.stdout.write(
    `\n Starting Service:: ${config.NAME} at ${new Date()} \n` 
);

process.stdout.write("\n********************************************************************************************************************************\n");


const app = new App(config.PORT);

app.listen();