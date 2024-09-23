const { statusCode: { INTERNAL_SERVER_ERROR, BAD_REQUEST, OK, FORBIDDEN } } = require('../default.json');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Account = require('../models/account.model')

exports.register = async (req, res) => {
    try {
        const { userName, password } = req.body;
        const findUser = await User.findOne({ userName })
        if (findUser) {
            return res.status(BAD_REQUEST).json({ success: false, message: "user already exists" })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            ...req.body,
            password: hashedPassword
        })
        const createdUser = await user.save();

        const initialAccount = {
            userId: createdUser._id,
            balance: (1 + (Math.random() * 10000)).toFixed(2)
        }
        await Account.create(initialAccount);
        res.status(OK).json({
            success: true,
            message: "user registered successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(INTERNAL_SERVER_ERROR).json({ success: false, message: error.message });
    }
}

exports.verify = async (req, res) => {
    try {
        const { userName, password } = req.body;

        const user = await User.findOne({ userName })
        if (!user) {
            return res.status(BAD_REQUEST).json({ success: false, message: "user doesn't exists" })
        }
        const isPassValid = await bcrypt.compare(password, user.password);
        if (!isPassValid) {
            return res.status(FORBIDDEN).json({ success: false, message: "password invalid" })
        }

        const token = jwt.sign({ userId: user._id, userName: userName }, process.env.JWT_SECRET);

        if (!token) {
            return res.status(BAD_REQUEST).json({ success: false, message: "token not generated" })
        }

        user.token = token;
        await user.save()

        res.status(OK).json({
            success: true,
            message: "user Login successfully",
            token: token
        })

    } catch (error) {
        console.log(error);
        return res.status(INTERNAL_SERVER_ERROR).json({ success: false, message: error.message });
    }
}

exports.updateProfile = async (req, res) => {
    try {
        const updateData = { ...req.body };
        if (req.body.password) {
            const hashPassword = await bcrypt.hash(req.body.password, 10);
            updateData.password = hashPassword;
        }

        const user = await User.findOneAndUpdate({ userName: req.userName }, updateData, { new: true })
        const sanitisedUser = {
            firstName: user.firstName,
            lastName: user.lastName,
        }
        return res.status(OK).json({ success: true, message: 'profile updated successfully', data: sanitisedUser })

    } catch (error) {
        console.log(error);
        return res.status(INTERNAL_SERVER_ERROR).json({ success: false, message: error.message });
    }
}

exports.getUsers = async (req, res) => {
    try {

        const userId = req.userId;
        const { filter } = req.query

        const query = filter ? {
            $or: [
                { firstName: { $regex: filter, $options: 'i' } },
                { lastName: { $regex: filter, $options: 'i' } }
            ]
        }
            : {};

        const getUsers = await User.find(query).select('userName lastName firstName');
        const sanitiseUser = getUsers.filter((users) => { return users._id != userId });
        return res.status(OK).json({ success: true, users: sanitiseUser })
    } catch (error) {
        console.log(error);
        return res.status(INTERNAL_SERVER_ERROR).json({ success: false, message: error.message });
    }
}

exports.verifyToken = async (req, res) => {
    try {
        const user = await User.findById(req.userId, ('-password -token'));
        return res.status(OK).json({ success: true, message: 'token verifed', userData: user })
    } catch (error) {
        console.log(error);
        return res.status(INTERNAL_SERVER_ERROR).json({ success: false, message: error.message });
    }
}

exports.getUserById = async (req, res) => {
    try {
        const { Id } = req.params;

        const getUser = await User.findById(Id, ('-password -token'));

        res.status(OK).json({ success: true, user: getUser });

    } catch (error) {
        console.log(error);
        return res.status(INTERNAL_SERVER_ERROR).json({ success: false, message: error.message });
    }
}