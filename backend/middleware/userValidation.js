const zod = require('zod');
const { statusCode: { BAD_REQUEST, INTERNAL_SERVER_ERROR } } = require('../default.json')

// user validation middleware using zod
exports.validateUser = (req, res, next) => {
    try {
        if (!req.body) {
            return res.status(BAD_REQUEST).json({ success: false, message: "empty request body" });
        }

        const userSchema = zod.object({
            firstName: zod.string(),
            lastName: zod.string(),
            userName: zod.string().email(),
            password: zod.string().min(8),
        });

        userSchema.parse(req.body);

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

exports.validateLoginUser = (req, res, next) => {
    try {
        if (!req.body) {
            return res.status(BAD_REQUEST).json({ success: false, message: "empty request body" });
        }

        const userSchema = zod.object({
            userName: zod.string().email(),
            password: zod.string().min(1),
        });

        userSchema.parse(req.body);

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

exports.validateProfile = (req, res, next) => {
    try {
        if (!req.body) {
            return res.status(BAD_REQUEST).json({ success: false, message: "empty request body" });
        }

        const userSchema = zod.object({
            firstName: zod.string().optional(),
            lastName: zod.string().optional(),
            password: zod.string().min(8).optional(),
        });

        userSchema.parse(req.body);

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
