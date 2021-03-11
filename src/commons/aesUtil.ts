import aes from "aes-js";
import crypto from "crypto";
import config from "../appConfig";

class AES {

    private key: ArrayBuffer = crypto.pbkdf2Sync(config.AES.SECRET, config.AES.SALT, 1000, 192/8, "sha512");

    public generateEncryptedHex(plainText: string) {
        const textBytes = aes.utils.utf8.toBytes(plainText); 
        const aesCtr = new aes.ModeOfOperation.ctr(this.key, new aes.Counter(7));
        const encryptedBytes = aesCtr.encrypt(textBytes);
        return aes.utils.hex.fromBytes(encryptedBytes);
    }


    public decryptHex(hex: string) {
        const encryptedBytes = aes.utils.hex.toBytes(hex);
        const aesCtr = new aes.ModeOfOperation.ctr(this.key, new aes.Counter(7));
        const decryptedBytes = aesCtr.decrypt(encryptedBytes);
        return aes.utils.utf8.fromBytes(decryptedBytes);
    }
}


export default new AES();