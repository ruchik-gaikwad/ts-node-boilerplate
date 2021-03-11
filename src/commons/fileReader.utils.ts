import fs from "fs";
import { ReadStream } from "fs";
import logger from "../logger";
import { createObjectCsvWriter } from "csv-writer";
class fileReaderUtils {
    


    public readFile(path: string, options: { encoding: string, flag: string } | any): Buffer {
        try {
            return fs.readFileSync(path, options);
        } catch (err) {
            logger.error("ERROR:: reading the file", path, options);
            throw new Error("Error reading the file!");
        }
    }

    public deleteFile(path: string): void {
        try {
            fs.unlinkSync(path);
            logger.info("File deleted", path);
        } catch (err) { 
            logger.error("ERROR:: deleting the file!", path);
            throw new Error(err);
        }
    }

    public extractHeaders(stream: ReadStream | any): string[] {
        try {
            return stream.split("\n")[0].split(",");
        } catch (err) {
            logger.error("ERROR::extracting the headers!"); 
            throw new Error(err);
        }
    }

    public validateHeaders(validHeaders: string[], fileHeaders: string[]): boolean {
            fileHeaders = fileHeaders.map(e => e.toLocaleLowerCase());
            if(fileHeaders.length >= validHeaders.length) {
                validHeaders.forEach((header: string) => {
                        if (fileHeaders.indexOf(header) <= -1) {
                            throw new Error(header + " coulmn is missing");
                        }                    
                }); 
                return true;
            } else {
                throw new Error("File has some missing headers!");
            }
    }

    // eslint-disable-next-line
    public getData(file: ReadStream | any, headerLength: number): [string[]] {
        let data = file.split("\n").splice(1);
        try {
            data = data.map((e: string) => e.split(","))
            .filter((e: string) => {
                return e;
            });
        } catch (err) {
            throw new Error("Data missing in the columns");
        }
        return data;

    }


    public writeCsvFile(headers: any[], absolutePath: string, data: any) {
        const csvWriter = createObjectCsvWriter({
            header: headers, 
            path: absolutePath
        });

        return csvWriter.writeRecords(data);
    }
}

export default new fileReaderUtils();