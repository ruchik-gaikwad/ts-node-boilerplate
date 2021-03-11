import aws from "aws-sdk";
import config from "../../appConfig";
import logger from "../../logger";
import multer from "multer"; 
import multerS3 from "multer-s3";




class S3Service {

    private aws_s3: aws.S3;

    constructor() {
        aws.config.update({
            accessKeyId: config.AWS_CONFIG.ACCESSKEYID,
            secretAccessKey: config.AWS_CONFIG.SECRETACCESSKEY,
            region: config.AWS_CONFIG.REGION
        });
        this.aws_s3 = new aws.S3({ apiVersion: "2006-03-01" });
    }

    uploadFileToS3(params: { Bucket: any, Key: string, Body: Buffer | Blob | string | ReadableStream, ACL: string }) {
        return new Promise((resolve, reject) => {
            this.aws_s3.upload(params, (err: Error, s3res: any) => {
                if (err) {
                    logger.error("ERROR:: uploading the file to S3");
                    logger.error(err);
                    reject(err);
                } else {
                    resolve(s3res);
                }
            });
        });
    }
    getListObjectInFolder(params: { Bucket: string, Prefix: string }) {
        return new Promise((resolve, reject) => {
            this.aws_s3.listObjectsV2(params, function (err: Error, s3res: any) {
                if (err) {
                    logger.error("ERROR:: getting the list object in folder in S3");
                    logger.error(err);
                    reject(err);
                } else {
                    resolve(s3res);
                }
            });
        });
    }
    getMetaDataOfFile(params: { Bucket: string, Key: string }, fileName: string | null = null) {
        return new Promise((resolve, reject) => {
            this.aws_s3.getObject(params, (err: Error, data: any) => {
                if (err) {
                    logger.error("ERROR:: getting the metadata for the file from S3");
                    logger.error(err);
                    reject(err);
                } else {
                    if (fileName != null) {
                        data.Metadata.file_name = fileName;
                    }
                    resolve(data.Metadata);
                }
            });
        });
    }
    deleteFilesFromS3(params: { Bucket: string, Delete: { Objects: [{ Key: string }], Quiet: boolean } }) {
        return new Promise((resolve, reject) => {
            this.aws_s3.deleteObjects(params, (err: Error, data: any) => {
                if (err) {
                    logger.error("ERROR:: deleting the file from the S3");
                    logger.error(err);
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    multerfileUploadToS3(){
        return multer({
            storage: multerS3({
                s3: this.aws_s3,
                bucket: config.AWS_CONFIG.DEFAULT_ASSET_BUCKET, 
                metadata: function(req, file, cb) {
                    cb(null, { fieldName:  "mycustomstring" });
                }, 
                key: function(req, file, cb) {
                    cb(null, new Date().toUTCString());
                }
            })
        });
    }
}
export default new S3Service();