const mongoose = require("mongoose")
const schema = mongoose.Schema(
    {
        name: String,
        email: String,
        phoneNo: String,
        fatherName: String,
        motherName: String,
        address: String,
        gender: {
            type: String,
            enum: ["male", "female"],
            default: "male"
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        }
    },


    { timestamps: true }
);

const PersonalInfo = mongoose.model("PersonalInfo", schema, "PersonalInfo");
exports.PersonalInfo = PersonalInfo;