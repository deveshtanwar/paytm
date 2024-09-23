const { statusCode: { INTERNAL_SERVER_ERROR, BAD_REQUEST, OK, FORBIDDEN } } = require('../default.json');
const Account = require('../models/account.model');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

exports.getBalance = async (req, res) => {
    try {
        const userId = req.userId;
        const userBalance = await Account.findOne({ userId: new ObjectId(userId) })
        res.status(OK).json({ success: true, balance: userBalance.balance })
    } catch (error) {
        console.log(error);
        return res.status(INTERNAL_SERVER_ERROR).json({ success: false, message: error.message });
    }
}

exports.transferAmount = async (req, res) => {
    try {

        const session = await mongoose.startSession();

        session.startTransaction();

        const { to, amount } = req.body;
        const userId = req.userId;
        const fromAccount = await Account.findOne({ userId: new ObjectId(userId) }).session(session);

        if (!fromAccount || fromAccount.balance < amount) {
            return res.status(BAD_REQUEST).json({ success: false, message: "Insufficient Balance" });
        }

        const toAccount = await Account.findOne({ userId: new ObjectId(to) }).populate('userId', '-password').session(session);

        if (!toAccount) {
            return res.status(BAD_REQUEST).json({ success: false, message: "Invalid Account" })
        }

        const userAccount = await Account.findOneAndUpdate({ userId: new ObjectId(userId) }, { $inc: { balance: -amount } }, { new: true }).session(session);
        await Account.updateOne({ userId: new ObjectId(to) }, { $inc: { balance: amount } }).session(session);


        session.commitTransaction();
        res.status(OK).json({
            success: true,
            message: "Amount Transfered successfully",
            balance: userAccount.balance,
            to: { firstName: toAccount.userId.firstName, lastName: toAccount.userId.lastName }
        })
    } catch (error) {
        console.log(error);
        return res.status(INTERNAL_SERVER_ERROR).json({ success: false, message: error.message });
    }
}
