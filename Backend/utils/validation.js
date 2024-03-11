const zod = require("zod");

exports.validation = (field, type) => {

    const emailSchema = zod.string().email();
    const passwordSchema = zod.string().min(8);
    const nameSchema = zod.string();

    if (type === "email") {
        return emailSchema.safeParse(field).success;
    }
    else if (type === "pass") {
        return passwordSchema.safeParse(field).success;
    }
    else if (type === "name") {
        return nameSchema.safeParse(field).success;
    }
    else if (type === "date") {
        if (Date.now() > Date.parse(field)) {
            return false;
        }
        else {
            return true;
        }
    }

}