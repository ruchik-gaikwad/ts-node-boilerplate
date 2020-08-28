import localConfig from "./env/local";
import devConfig from "./env/dev";
import stageConfig from "./env/stage";
import prodConfig from "./env/prod";


const effectiveEnv = (process.env.NODE_ENV || "dev").toLocaleLowerCase();


process.stdout.write("\n---------------------------------------------------------------------------------------------------------------------------\n");
process.stdout.write(`\nConfiguring Service with Env : ${effectiveEnv}\n`);
process.stdout.write("\n---------------------------------------------------------------------------------------------------------------------------\n");


let effectiveConfig : {
    NAME: string,
    PORT: number | string, 
    MONGO_URL: string
} = prodConfig;

switch(effectiveEnv) {
    case "local":
        effectiveConfig = localConfig;
        break;
    case "dev":
        effectiveConfig = devConfig;
        break;
    case "satge": 
        effectiveConfig = stageConfig;
        break;
    case "prod": 
        effectiveConfig = prodConfig;
        break;
    default:
        effectiveConfig = prodConfig;
        break;
}

process.stdout.write(
    `\nPicked up configuration ${JSON.stringify(effectiveConfig)} \n`
  );

export default effectiveConfig;

