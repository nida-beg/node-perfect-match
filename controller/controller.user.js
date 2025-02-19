// import { sendEmail } from "../helper/email-helper";
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../helper/email-helper");
const { EduInfo } = require("../models/eduInfo.model");
const { PersonalInfo } = require("../models/personalInfo.model");
const { User } = require("../models/user.model");
const bcrypt = require("bcrypt")
const { unlink } = require('node:fs/promises');




exports.register = async (req, res) => {
    if (!req.body.name) {
        res.status(400).send({ message: "name cannot be empty" })
        return;
    }
    const hashPassword = await bcrypt.hash(req.body.password, 10)
    const user = User({
        name: req.body.name,
        email: req.body.email,
        city: req.body.city,
        creatingFor: req.body.creatingFor,
        password: hashPassword

    })
    console.log("user::", req.body)
    user
        .save(user)
        .then(data => {
            // sendEmail(data)
            res.send({ message: "you have registered sucessfully", data: data })
        })
        .catch(err => {
            console.log('err.code', err.code)
            if (err.code === 11000) {
                console.log("Nida is here")
                res.status(500).send({
                    message: "User with same Email is already exist"
                })

            } else {
                res.status(500).send({
                    message: err.message || "some error occured"
                })
            }
        })
}
exports.logIn = (req, res) => {
    console.log('in login::::', req.body)
    const emailId = req.body.email;
    const password = req.body.password;
    User.findOne({ email: emailId })


        .then(async data => {


            if (data) {



                const isMatched = await bcrypt.compare(password, data.password);
                console.log('...data::::::', isMatched)
                if (isMatched) {
                    const token = jwt.sign({ user: data }, 'your-secret-key', { expiresIn: '1h' })
                    const response = {
                        name: data.name,
                        email: data.email,
                        creating_for: data.creatingFor,
                        city: data.city,
                        profilePic: data.profilePic,
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
    setTimeout(() => {
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

    }, 5000);

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
        userId: req.user._id


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
exports.getPersonalInfo = (req, res) => {
    console.log("userId::", req.user._id)
    const userId = req.user._id

    PersonalInfo.findOne({ userId: userId })

        .then(data => {
            console.log("data::", data)
            res.send({ message: "info retrieved", personalInfo: data })

        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "some error occured"
            })
        })
}
exports.updatePersonalInfo = (req, res) => {
    const userId = req.user._id
    const personalInfo = req.body
    PersonalInfo.updateOne({ userId: userId }, personalInfo)
        .then(data => {
            res.send({ message: "updated Successfully", data: data })
        })
        .catch(err => {

            res.status(500).send({
                message: err.message || "some error occured"
            })

        })
}
exports.editProfilePic = async (req, res) => {
    if (!req.file) {
        res.status(400).send({ message: "You haven't upload any file" })
        return
    }
    const imageUpdate = { profilePic: req.file.path }
    const existingUser = await User.findOne({ _id: req.user._id })
    User
        .updateOne({ _id: req.user._id }, imageUpdate)
        .then(async (data) => {
            console.log("existingUser", existingUser)
            const path = existingUser.profilePic

            if (path) {
                await unlink(path);
                console.log(`successfully deleted ${path}`);
            }



            res.send({ message: "image upload successfully" })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "some error occured"
            })
        })


}

exports.updateProfile = (req, res) => {
    const profileInfo = req.body
    User
        .updateOne({ _id: req.user._id }, profileInfo)
        .then((data) => {
            console.log("data", data)
            res.send({ message: "record has been updated" })
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "some error occured"
            })

        })
}
exports.getProfile = (req, res) => {
    const userId = req.user._id

    User
        .findOne({ _id: userId })
        .select({ "name": 1, "email": 1, "city": 1, "profilePic": 1, "_id": 0 })
        .then((data) => {
            res.send({ message: "info Retrieved", data: data })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "some error occured"
            })
        })
}
exports.getUser = async (req, res) => {
    const personalInfoData = await PersonalInfo.findOne({ userId: req.user._id })
    const count = await PersonalInfo.countDocuments({ gender: { $ne: personalInfoData?.gender } })
    PersonalInfo
        .find({ gender: { $ne: personalInfoData?.gender } })
        .limit(req.query.limit).skip(req.query.start)
        .populate([
            { path: "userId", select: ["city", "profilePic"] }
        ])
        .then((data) => {

            res.send({ message: "info retrieved", data: { users: data, count } })

        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "some error occured"
            })

        }
        )
}