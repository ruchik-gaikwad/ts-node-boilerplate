class GeneralUtils {

    generatePassword(){

        const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
                const length = 8;
                let randomString = "";
                for (let i=0; i<length; i++) {
                    const rnum = Math.floor(Math.random() * chars.length);
                    randomString += chars.substring(rnum,rnum+1);
                }
    
            return randomString;
    } 
    

}

export default new GeneralUtils();