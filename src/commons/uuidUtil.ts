import { v4 as uuidv4, validate as validateId, v1 as uuidv1, v3 as uuidv3 } from "uuid";
import shortUuid from "short-uuid";
class uuidUtil {

     private v4Options = {}

     generateCustomDocumentId() {
          return uuidv4(this.v4Options);
     }

     generateNameSpaceId(name: string, nameSpace: string) {
          return uuidv3(name, nameSpace);
     }

     generateUudiV1() {
          return uuidv1(this.v4Options);
     }

     generateRandomNumber() {
          return Math.floor(100000 + Math.random() * 900000);
     }

     generateEpocTimeId() {
          return Math.floor(new Date().getTime() / 1000);
     }
     validateUuid(uuid: string) {
          return validateId(uuid);
     }

     generateShortUuid() {
          return shortUuid.generate();
     }

}


export default new uuidUtil();