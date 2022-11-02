import crypto from "crypto";

const salt = "MakeThingsGoRight"

function hash (plainText: string): string {

    if(!plainText) return null;

    return crypto.createHmac("sha512", salt).update(plainText).digest("hex");

}

export default hash;