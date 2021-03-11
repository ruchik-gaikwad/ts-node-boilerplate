import multer from "multer";
import path from "path";
import HttpException from "./httpExceptions/httpException";


class fileUploadService {

    private dest = "./temp/assets";
    private limit = { fileSize: 15 * 1024 * 1024, fields: 30 };
    private storaage = multer.diskStorage({
        destination: function (req: Request | any, res: Response | any, next: CallableFunction | any) {
            next(null, ".");
        },
        filename: function (req: Request | any, file: any, next: CallableFunction | any) {
            next(null, `${new Date().getTime()}-${file.originalname}`);
        }
    })


    public singleFile(feildName: string) {
        return multer({ storage: this.storaage, limits: this.limit, fileFilter: this.checkFileTypes }).single(feildName);
    }


    public uploadMultileFiles(options: { name: string, maxCount: number }[]) {
        return multer({ limits: this.limit, storage: this.storaage, fileFilter: this.checkFileTypes }).fields(options);
    }

    private checkFileTypes(req: any, file: any, next: CallableFunction) {
        // Allowed ext
        const filetypes = /jpeg|jpg|png|gif|mp4|csv|pdf|doc|docx|vnd.ms.excel/;
        // Check ext
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        // Check mime
        const mimetype = filetypes.test(file.mimetype);
        if (mimetype && extname) {
            return next(null, true);
        } else {
            next(new HttpException(400, "Allowed file extn's are .jpeg .jpg .png .gif .mp4 .csv vnd.ms.excel"));
        }
    }

}

export default new fileUploadService();