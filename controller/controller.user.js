// import { sendEmail } from "../helper/email-helper";
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../helper/email-helper");
const { EduInfo } = require("../models/eduInfo.model");
const { PersonalInfo } = require("../models/personalInfo.model");
const { User } = require("../models/user.model");
const bcrypt = require("bcrypt")
exports.register = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({ message: "name cannot be empty" })
        return;
    }
    const hashPassword = bcrypt.hash(req.body.password, 10)
    const user = User({
        name: req.body.name,
        email: req.body.email,
        city: req.body.city,
        creatingFor: req.body.creatingFor,
        password: hashPassword

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
    User.findOne({ email: emailId })
        .then(async data => {

            if (data) {
                const isMatched = await bcrypt.compare(password, data.password)
                if (isMatched) {
                    const token = jwt.sign({ user: data }, 'your-secret-key', { expiresIn: '1h' })
                    const response = {
                        name: data.name,
                        email: data.email,
                        creating_for: data.creatingFor,
                        city: data.city,
                        password: data.password,
                        token: token

                    }
                    res.send({ message: "successfully loggedIn", data: response })
                }

                else { res.send({ message: "your password is incorrect" }) }
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
        userId: req.user._id


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
    const uId = req.user._id
    EduInfo
        .find({ userId: uId })
        .populate([
            { path: "userId", select: ["name", "email"] }
        ])
        .then(data => {
            res.send({ message: "information found successfully..", eduData: data })

        })
        .catch(err => {
            res.status(500).send(
                { message: err.message || "some error occured" }
            )
        })
}

exports.savePersonalInfo = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({ message: "Name cannot be empty" })
        return;
    }
    const personalInfo = PersonalInfo({
        name: req.body.name,
        email: req.body.email,
        phoneNo: req.body.phoneNo,
        fatherName: req.body.fatherName,
        motherName: req.body.motherName,
        address: req.body.address,
        gender: req.body.gender,
        userId: req.body.userId


    })
    personalInfo
        .save(personalInfo)
        .then(data => {
            res.send({ message: "Information added sucessfully", data: data })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "some error occured"
            })
        })
}

