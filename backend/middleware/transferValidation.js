const zod = require('zod');
const { statusCode: { INTERNAL_SERVER_ERROR, BAD_REQUEST } } = require('../default.json');


const transferSchema = zod.object({
    to: zod.string(),
    amount: zod.number(),
})

exports.transferValidate = (req, res, next) => {
    try {
        if (!req.body) {
            return res.status(BAD_REQUEST).json({ success: false, message: "empty request body" });
        }

        transferSchema.parse(req.body);
        next();
    } catch (error) {
        if (error instanceof zod.ZodError) {
            return res.status(BAD_REQUEST).json({ success: false, message: error.errors.map(err => err.message).join(", ") });
        }

        // if error is not a zod error, return a 500 response
        console.log(error);
        return res.status(INTERNAL_SERVER_ERROR).json({ success: false, message: "Internal Server Error" });
    }
}
