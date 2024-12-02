// import { sendEmail } from "../helper/email-helper";
const { sendEmail } = require("../helper/email-helper");
const { EduInfo } = require("../models/eduInfo.model");
const { User } = require("../models/user.model");

exports.register = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({ message: "name cannot be empty" })
        return;
    }
    const user = User({
        name: req.body.name,
        email: req.body.email,
        city: req.body.city,
        creatingFor: req.body.creatingFor,
        password: req.body.password

    })
    user
        .save(user)
        .then(data => {
            // sendEmail(data)
            res.send({ message: "you have registered sucessfully", data: data })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "some error occured"
            })
        })
}
exports.logIn = (req, res) => {
    const emailId = req.body.email;
    const password = req.body.password;
    User.findOne({ email: emailId, password: password })
        .then(data => {

            if (data) {

                res.send({ message: "successfully loggedIn", data: data })

            }
            else {

                res.send({ message: " Invalid credentials" })

            }


        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "some error occured while loggingIn"
            })
        })
}
exports.saveEduInfo = (req, res) => {
    if (!req.body.degree) {
        res.status(400).send({ message: "degree cannot be empty" })
        return;
    }
    const eduInfo = EduInfo({
        degree: req.body.degree,
        course_name: req.body.course_name,
        university: req.body.university,
        yearOfPassing: req.body.yearOfPassing,
        userId: req.body.userId


    })
    eduInfo
        .save(eduInfo)
        .then(data => {
            res.send({ message: "Information added sucessfully", data: data })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "some error occured"
            })
        })
}

exports.getEduInfo = (req, res) => {
    const uId = '671e9cac25dfb0ba672837b4'
    EduInfo
        .find({ userId: uId })
        .populate([
            { path: "userId", select: ["name", "email"] }
        ])
        .then(data => {
            res.send({ message: "information found successfully..", Edudata: data })

        })
        .catch(err => {
            res.status(500).send(
                { message: err.message || "some error occured" }
            )
        })
}

